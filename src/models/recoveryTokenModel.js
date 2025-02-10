import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import Usuario from './usuarioModel.js';

const RecoveryToken = sequelize.define('RecoveryToken', {
  id_token: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  token: {
    type: DataTypes.STRING,
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
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: 'recoverytoken',
  timestamps: false,
});

// Relación con Usuario
Usuario.hasMany(RecoveryToken, { foreignKey: 'usuario_id' });
RecoveryToken.belongsTo(Usuario, { foreignKey: 'usuario_id' });

export default RecoveryToken;

