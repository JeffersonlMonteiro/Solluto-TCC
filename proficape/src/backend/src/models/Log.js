const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Log = sequelize.define('Log', {
  LOG_INT_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  USU_INT_ID: { type: DataTypes.INTEGER, allowNull: false },
  LOG_VAR_TIPOALT: { type: DataTypes.STRING(10), allowNull: false },
  LOG_ENUM_TABLE_ALT: {
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
  },
  LOG_JSONB_ANTDATA: { type: DataTypes.JSONB, allowNull: false },
  LOG_JSONB_NEWDATA: { type: DataTypes.JSONB, allowNull: false },
  LOG_TEXT_DESCR: { type: DataTypes.TEXT },
  LOG_TMS_DTCAD: { type: DataTypes.DATE, allowNull: false },
  USU_INT_COD_CAD: { type: DataTypes.INTEGER, allowNull: false },
  LOG_TMS_DTALT: { type: DataTypes.DATE, allowNull: false },
  USU_INT_COD_ALT: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'tbl_log', timestamps: false });

module.exports = Log;