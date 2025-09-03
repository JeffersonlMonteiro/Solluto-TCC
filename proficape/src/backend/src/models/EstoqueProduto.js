const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EstoqueProduto = sequelize.define('EstoqueProduto', {
  ESP_INT_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  PRO_INT_ID: { type: DataTypes.INTEGER, allowNull: false },
  EST_INT_ID: { type: DataTypes.INTEGER, allowNull: false },
  ESP_NUM_QNT: { type: DataTypes.DECIMAL, allowNull: false },
  ESP_VAR_UNID: { type: DataTypes.STRING(20), allowNull: false },
  ESP_VAR_LOCALIZACAO: { type: DataTypes.STRING(100) },
  ESP_DEC_VALORCUSTO: { type: DataTypes.DECIMAL, allowNull: false },
  ESP_NUM_QNTMIM: { type: DataTypes.DECIMAL, allowNull: false },
  ESP_TMS_DTENTRADA: { type: DataTypes.DATE, allowNull: false },
  ESP_TMS_DTSAIDA: { type: DataTypes.DATE, allowNull: false },
  ESP_TMS_DTCAD: { type: DataTypes.DATE, allowNull: false },
  ESP_TMS_DTALT: { type: DataTypes.DATE, allowNull: false }
}, { tableName: 'tbl_estoque_produto', timestamps: false });

module.exports = EstoqueProduto;