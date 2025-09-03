const express = require('express');
const router = express.Router();
const { Pedido, PedidoCliente, Produto, EstoqueProduto, EstoqueMovimentacao, Cliente, FormaPagamento, EnderecoEntrega } = require('../models');
const authMiddleware = require('../middlewares/auth');
const { sequelize } = require('../models');

// Criar pedido
router.post('/', authMiddleware, async (req, res) => {
  const { CLI_INT_ID, PRO_INT_ID, PEC_INT_QNT, FOP_INT_ID, END_INT_ID } = req.body;
  const transaction = await sequelize.transaction();
  try {
    const produto = await Produto.findByPk(PRO_INT_ID);
    if (!produto) throw new Error('Produto não encontrado');

    const estoqueProduto = await EstoqueProduto.findOne({ where: { PRO_INT_ID } });
    if (!estoqueProduto || estoqueProduto.ESP_NUM_QNT < PEC_INT_QNT) {
      throw new Error('Estoque insuficiente');
    }

    // Criar pedido
    const subtotal = produto.PRO_NUM_PRECO * PEC_INT_QNT;
    const pedido = await Pedido.create({
      CLI_INT_ID,
      PRO_DTPEDIDO: new Date(),
      PRO_VAR_STATUS: 'pendente',
      PED_DECIMAL_TOTAL: subtotal,
      PED_TMS_DTCAD: new Date(),
      PED_TMS_DTALT: new Date(),
      USU_INT_COD_CAD: req.USU_INT_ID,
      USU_INT_COD_ALT: req.USU_INT_ID
    }, { transaction });

    // Criar item do pedido
    await PedidoCliente.create({
      PRO_INT_ID,
      PED_INT_ID: pedido.PED_INT_ID,
      END_INT_ID,
      FOP_INT_ID,
      PEC_INT_QNT,
      PEC_DECIMAL_SUBTOTAL: subtotal,
      PED_TMS_DTCAD: new Date(),
      PED_TMS_DTALT: new Date()
    }, { transaction });

    // Atualizar estoque
    estoqueProduto.ESP_NUM_QNT -= PEC_INT_QNT;
    await estoqueProduto.save({ transaction });

    // Registrar movimentação
    await EstoqueMovimentacao.create({
      EST_INT_ID: estoqueProduto.EST_INT_ID,
      ESM_VAR_TIPOMOV: 'saida',
      ESM_NUM_QNT: PEC_INT_QNT,
      ESM_DEC_PRECO_UND: produto.PRO_NUM_PRECO,
      ESM_TMS_DATAMOV: new Date(),
      ESM_TMS_DTCAD: new Date(),
      ESM_TMS_DTALT: new Date()
    }, { transaction });

    await transaction.commit();
    res.json(pedido);
  } catch (err) {
    await transaction.rollback();
    res.status(400).json({ error: err.message });
  }
});

// Atualizar status do pedido
router.put('/:PED_INT_ID/status', authMiddleware, async (req, res) => {
  const { PED_INT_ID } = req.params;
  const { PRO_VAR_STATUS } = req.body;
  const pedido = await Pedido.findByPk(PED_INT_ID);
  if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
  pedido.PRO_VAR_STATUS = PRO_VAR_STATUS;
  pedido.PED_TMS_DTALT = new Date();
  pedido.USU_INT_COD_ALT = req.USU_INT_ID;
  await pedido.save();
  res.json(pedido);
});

module.exports = router;