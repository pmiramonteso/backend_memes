import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const Usuario = sequelize.define('Usuario', {
  id_usuario: {
    type: DataTypes.INTEGER(5).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  roles: {
    type: DataTypes.ENUM("admin", "usuario"),
    allowNull: false,
    defaultValue: 'usuario',
  },
}, {
  tableName: 'usuario',
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

export default Usuario;
