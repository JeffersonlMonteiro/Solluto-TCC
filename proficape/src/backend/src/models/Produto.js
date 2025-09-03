const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
  PRO_INT_ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  CAP_INT_ID: { type: DataTypes.INTEGER },
  PRO_VAR_NOME: { type: DataTypes.STRING(100), allowNull: false },
  PRO_TXT_DESCR: { type: DataTypes.TEXT },
  PRO_NUM_PRECO: { type: DataTypes.DECIMAL, allowNull: false },
  PRO_TXT_IMGPATH: { type: DataTypes.TEXT },
  PRO_TMS_DTCAD: { type: DataTypes.DATE, allowNull: false },
  PRO_TMS_DTALT: { type: DataTypes.DATE, allowNull: false },
  USU_INT_COD_CAD: { type: DataTypes.INTEGER, allowNull: false },
  USU_INT_COD_ALT: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'tbl_produto', timestamps: false });

module.exports = Produto;