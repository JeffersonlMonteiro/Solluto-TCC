const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tabela = sequelize.define('Tabela', {
  value: {
    type: DataTypes.ENUM(
      'tbl_usuario',
      'tbl_estoque',
      'tbl_log',
      'tbl_produto',
      'tbl_forma_pagamento',
      'tbl_endereco_entrega',
      'tbl_cliente',
      'tbl_pedido_cliente',
      'tbl_categoria_produto',
      'tbl_estoque_produto',
      'tbl_estoque_movimentacoes',
      'tbl_pedido'
    ),
    allowNull: false
  }
}, { tableName: 'Tabela', timestamps: false });

module.exports = Tabela;