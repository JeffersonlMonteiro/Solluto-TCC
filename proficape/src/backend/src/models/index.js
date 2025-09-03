const sequelize = require('../config/database');
const Tabela = require('./Tabela');
const Usuario = require('./Usuario');
const Estoque = require('./Estoque');
const Log = require('./Log');
const Produto = require('./Produto');
const FormaPagamento = require('./FormaPagamento');
const EnderecoEntrega = require('./EnderecoEntrega');
const Cliente = require('./Cliente');
const PedidoCliente = require('./PedidoCliente');
const CategoriaProduto = require('./CategoriaProduto');
const EstoqueProduto = require('./EstoqueProduto');
const EstoqueMovimentacao = require('./EstoqueMovimentacao');
const Pedido = require('./Pedido');

// Associações
Usuario.hasMany(Log, { foreignKey: 'USU_INT_ID' });
Log.belongsTo(Usuario, { foreignKey: 'USU_INT_ID' });
// ... (other associations as previously provided)

module.exports = {
  sequelize,
  Tabela,
  Usuario,
  Estoque,
  Log,
  Produto,
  FormaPagamento,
  EnderecoEntrega,
  Cliente,
  PedidoCliente,
  CategoriaProduto,
  EstoqueProduto,
  EstoqueMovimentacao,
  Pedido
};