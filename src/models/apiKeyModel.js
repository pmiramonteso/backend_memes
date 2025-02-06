const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const ApiKey = sequelize.define('ApiKey', {
  id_apikey: {
    type: DataTypes.INTEGER(5).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  key: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true, //AQUI esta el problema de recovery?
  },
  usuario_id: {
    type: DataTypes.INTEGER(5).UNSIGNED,
    allowNull: false,
    references: {
      model: 'Usuarios',
      key: 'id_usuario',
    },
  },
  status: {
    type: DataTypes.ENUM("activo", "revocado"),
    allowNull: false,
    defaultValue: 'activo',
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
});

module.exports = ApiKey;
