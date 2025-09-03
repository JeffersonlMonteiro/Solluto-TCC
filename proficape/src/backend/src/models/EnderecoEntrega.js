const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EnderecoEntrega = sequelize.define('EnderecoEntrega', {
  END_INT_ID: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  END_VAR_LAGRADOURO: { type: DataTypes.STRING(100), allowNull: false },
  END_VAR_NUMERO: { type: DataTypes.STRING(100), allowNull: false },
  END_VAR_COMPLEMENTO: { type: DataTypes.STRING(100), allowNull: false },
  END_VAR_BAIRRO: { type: DataTypes.STRING(100), allowNull: false },
  END_VAR_CIDADE: { type: DataTypes.STRING(100), allowNull: false },
  END_VAR_ESTADO: { type: DataTypes.STRING(100), allowNull: false },
  END_VAR_CEP: { type: DataTypes.STRING(100), allowNull: false },
  END_TMS_DTENTREGA: { type: DataTypes.DATE, allowNull: false },
  END_VAR_TIPOENTREGA: { type: DataTypes.STRING(20), allowNull: false },
  END_TMS_DTCAD: { type: DataTypes.DATE, allowNull: false },
  END_TMS_DTALT: { type: DataTypes.DATE, allowNull: false }
}, { tableName: 'tbl_endereco_entrega', timestamps: false });

module.exports = EnderecoEntrega;