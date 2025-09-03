const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Estoque = sequelize.define('Estoque', {
  EST_INT_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  EST_VAR_NOME: { type: DataTypes.STRING(100), allowNull: false },
  EST_TXT_DESCR: { type: DataTypes.TEXT },
  EST_TMS_DTCAD: { type: DataTypes.DATE, allowNull: false },
  EST_TMS_DTALT: { type: DataTypes.DATE, allowNull: false },
  USU_INT_COD_CAD: { type: DataTypes.INTEGER, allowNull: false },
  USU_INT_COD_ALT: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'tbl_estoque', timestamps: false });

module.exports = Estoque;