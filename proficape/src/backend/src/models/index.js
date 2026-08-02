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

CategoriaProduto.hasMany(Produto, { foreignKey: 'CAP_INT_ID'});
Produto.belongsTo(CategoriaProduto, {foreignKey: 'CAP_INT_ID'});

Cliente.hasMany(Pedido, { foreignKey: 'CLI_INT_ID' });
Pedido.belongsTo(Cliente, { foreignKey: 'CLI_INT_ID' });

Pedido.hasMany(PedidoCliente, { foreignKey: 'PED_INT_ID' });
PedidoCliente.belongsTo(Pedido, { foreignKey: 'PED_INT_ID' });

Produto.hasMany(PedidoCliente, { foreignKey: 'PRO_INT_ID' });
PedidoCliente.belongsTo(Produto, { foreignKey: 'PRO_INT_ID' });

EnderecoEntrega.hasMany(PedidoCliente, { foreignKey: 'END_INT_ID' });
PedidoCliente.belongsTo(EnderecoEntrega, { foreignKey: 'END_INT_ID' });

FormaPagamento.hasMany(PedidoCliente, { foreignKey: 'FOP_INT_ID' });
PedidoCliente.belongsTo(FormaPagamento, { foreignKey: 'FOP_INT_ID' });

Produto.hasMany(EstoqueProduto, { foreignKey: 'PRO_INT_ID' });
EstoqueProduto.belongsTo(Produto, { foreignKey: 'PRO_INT_ID' });

Estoque.hasMany(EstoqueProduto, { foreignKey: 'EST_INT_ID' });
EstoqueProduto.belongsTo(Estoque, { foreignKey: 'EST_INT_ID' });

// ... (outras associações)

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