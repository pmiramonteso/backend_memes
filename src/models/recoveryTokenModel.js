const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');
const Usuario = require('./usuarioModel.js');

const RecoveryToken = sequelize.define('RecoveryToken', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER(5).UNSIGNED,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  }
}, {
  timestamps: false,
});

Usuario.hasMany(RecoveryToken, { foreignKey: 'usuario_id' });
RecoveryToken.belongsTo(Usuario, { foreignKey: 'usuario_id' });

module.exports = RecoveryToken;
