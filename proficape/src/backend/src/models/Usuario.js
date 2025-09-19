
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Corrigido para evitar importação circular

const Usuario = sequelize.define('Usuario', {
  USU_INT_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  USU_VAR_NOME: { type: DataTypes.STRING(100), allowNull: false },
  USU_VAR_EMAIL: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  USU_VAR_TELEFONE: { type: DataTypes.STRING(15), allowNull: false },
  USU_VAR_SENHA: { type: DataTypes.STRING(255), allowNull: false },
  USU_TMS_DTCAD: { type: DataTypes.DATE, allowNull: false },
  USU_INT_COD_CAD: { type: DataTypes.INTEGER, allowNull: false },
  USU_TMS_DTALT: { type: DataTypes.DATE, allowNull: false },
  USU_INT_COD_ALT: { type: DataTypes.INTEGER, allowNull: false },
  USU_VAR_RESET_TOKEN: { type: DataTypes.STRING(255), allowNull: true },
  USU_TMS_RESET_EXP: { type: DataTypes.DATE, allowNull: true },
  USU_TXT_IMGPATH: { type: DataTypes.TEXT }
}, { tableName: 'tbl_usuario', timestamps: false });

module.exports = Usuario;
