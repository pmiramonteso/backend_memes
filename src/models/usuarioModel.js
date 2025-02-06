const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

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
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  roles: {
    type: DataTypes.ENUM("admin", "usuario"),
    allowNull: false,
    defaultValue: 'usuario',
    get() {
      const rawValue = this.getDataValue('roles');
      if (!rawValue) {
        return [];
      }
      return rawValue.split(',');
    },
    set(value) {
      if (Array.isArray(value)) {
        this.setDataValue('roles', value.join(','));
      } else if (typeof value === 'string') {
        this.setDataValue('roles', value);
      } else {
      }
    }
  },
}, {
  indexes: [{ unique: true, fields: ['email'] }],
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

module.exports = Usuario;
