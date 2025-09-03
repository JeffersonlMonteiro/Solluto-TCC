const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EstoqueMovimentacao = sequelize.define('EstoqueMovimentacao', {
  ESM_INT_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  EST_INT_ID: { type: DataTypes.INTEGER, allowNull: false },
  ESM_VAR_TIPOMOV: { type: DataTypes.STRING(10), allowNull: false },
  ESM_NUM_QNT: { type: DataTypes.DECIMAL, allowNull: false },
  ESM_DEC_PRECO_UND: { type: DataTypes.DECIMAL, allowNull: false },
  ESM_TMS_DATAMOV: { type: DataTypes.DATE, allowNull: false },
  ESM_TXT_DESCR: { type: DataTypes.TEXT },
  ESM_TMS_DTCAD: { type: DataTypes.DATE, allowNull: false },
  ESM_TMS_DTALT: { type: DataTypes.DATE, allowNull: false }
}, { tableName: 'tbl_estoque_movimentacoes', timestamps: false });

module.exports = EstoqueMovimentacao;