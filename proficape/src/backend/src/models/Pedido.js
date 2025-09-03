const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define('Pedido', {
  PED_INT_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  CLI_INT_ID: { type: DataTypes.INTEGER, allowNull: false },
  PRO_DTPEDIDO: { type: DataTypes.DATE, allowNull: false },
  PRO_VAR_STATUS: { type: DataTypes.STRING(20), allowNull: false },
  PED_DECIMAL_TOTAL: { type: DataTypes.DECIMAL },
  PED_TMS_DTCAD: { type: DataTypes.DATE, allowNull: false },
  PED_TMS_DTALT: { type: DataTypes.DATE, allowNull: false },
  USU_INT_COD_CAD: { type: DataTypes.INTEGER, allowNull: false },
  USU_INT_COD_ALT: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'tbl_pedido', timestamps: false });

module.exports = Pedido;