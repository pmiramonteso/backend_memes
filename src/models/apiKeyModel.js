import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import Usuario from './usuarioModel.js';

const ApiKey = sequelize.define('ApiKey', {
  id_apikey: {
    type: DataTypes.INTEGER(5).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  key: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true, 
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
}, {
  tableName: 'apikey',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at',
});

// Relación con Usuario
Usuario.hasMany(ApiKey, { foreignKey: 'usuario_id' });
ApiKey.belongsTo(Usuario, { foreignKey: 'usuario_id' });

export default ApiKey;

