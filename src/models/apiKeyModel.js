import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const ApiKey = sequelize.define('apiKey', {
  id_apikey: {
    type: DataTypes.INTEGER(5).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  key: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true, // Asegúrate de que no haya duplicados en la base de datos
  },
  usuario_id: {
    type: DataTypes.INTEGER(5).UNSIGNED,
    allowNull: false,
    references: {
      model: 'usuario',
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

export default ApiKey;
