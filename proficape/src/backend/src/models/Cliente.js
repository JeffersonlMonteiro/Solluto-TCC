const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define('Cliente', {
  CLI_INT_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  CLI_VAR_NOME: { type: DataTypes.STRING(255) },
  CLI_VAR_EMAIL: { type: DataTypes.STRING(255) },
  CLI_VAR_CPF: { type: DataTypes.STRING(255) },
  CLI_VAR_TELEFONE: { type: DataTypes.STRING(255) },
  CLI_TMS_DTCAD: { type: DataTypes.DATE, allowNull: false },
  CLI_TMS_DTALT: { type: DataTypes.DATE, allowNull: false },
  USU_INT_COD_CAD: { type: DataTypes.INTEGER, allowNull: false },
  USU_INT_COD_ALT: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'tbl_cliente', timestamps: false });

module.exports = Cliente;