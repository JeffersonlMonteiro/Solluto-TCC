const express = require('express');
const router = express.Router();
const { Produto, CategoriaProduto } = require('../models');
const authMiddleware = require('../middlewares/auth');

// Listar produtos
router.get('/', async (req, res) => {
  const produtos = await Produto.findAll({ include: [CategoriaProduto] });
  res.json(produtos);
});

// Adicionar produto
router.post('/', authMiddleware, async (req, res) => {
  const { PRO_VAR_NOME, PRO_TXT_DESCR, PRO_NUM_PRECO, CAP_INT_ID } = req.body;
  try {
    const produto = await Produto.create({
      PRO_VAR_NOME,
      PRO_TXT_DESCR,
      PRO_NUM_PRECO,
      CAP_INT_ID,
      PRO_TMS_DTCAD: new Date(),
      PRO_TMS_DTALT: new Date(),
      USU_INT_COD_CAD: req.USU_INT_ID,
      USU_INT_COD_ALT: req.USU_INT_ID
    });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;