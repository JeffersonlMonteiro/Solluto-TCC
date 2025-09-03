const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CategoriaProduto = sequelize.define('CategoriaProduto', {
  CAP_INT_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  CAP_VAR_NOME: { type: DataTypes.STRING(100), allowNull: false },
  CAP_TXT_DESCR: { type: DataTypes.TEXT },
  CAP_TMS_DTCAD: { type: DataTypes.DATE, allowNull: false },
  CAP_TMS_DTALT: { type: DataTypes.DATE, allowNull: false }
}, { tableName: 'tbl_categoria_produto', timestamps: false });

module.exports = CategoriaProduto;