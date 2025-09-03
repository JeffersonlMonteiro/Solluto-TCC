const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FormaPagamento = sequelize.define('FormaPagamento', {
  FOP_INT_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  FOP_VAR_NOME: { type: DataTypes.STRING(255), allowNull: false },
  FOP_TXT_DESCR: { type: DataTypes.TEXT, allowNull: false },
  FOP_DECIMAL_TAXA: { type: DataTypes.DECIMAL, allowNull: false },
  FOP_BOOL_ATIVO: { type: DataTypes.BOOLEAN, allowNull: false },
  FOP_TMS_DTCAT: { type: DataTypes.DATE, allowNull: false },
  FOP_TMS_DTALT: { type: DataTypes.DATE, allowNull: false }
}, { tableName: 'tbl_forma_pagamento', timestamps: false });

module.exports = FormaPagamento;