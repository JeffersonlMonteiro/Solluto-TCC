const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PedidoCliente = sequelize.define('PedidoCliente', {
  PRO_INT_ID: { type: DataTypes.INTEGER, allowNull: false },
  PED_INT_ID: { type: DataTypes.INTEGER, allowNull: false },
  END_INT_ID: { type: DataTypes.INTEGER, allowNull: false },
  FOP_INT_ID: { type: DataTypes.INTEGER, allowNull: false },
  PEC_INT_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  PEC_INT_QNT: { type: DataTypes.INTEGER, allowNull: false },
  PEC_DECIMAL_SUBTOTAL: { type: DataTypes.DECIMAL, allowNull: false },
  PEC_TXT_OBSV_PEDIDO: { type: DataTypes.TEXT },
  PEC_DECIMAL_DESCONTO: { type: DataTypes.DECIMAL },
  PED_TMS_DTCAD: { type: DataTypes.DATE, allowNull: false },
  PED_TMS_DTALT: { type: DataTypes.DATE, allowNull: false }
}, { tableName: 'tbl_pedido_cliente', timestamps: false });

module.exports = PedidoCliente;