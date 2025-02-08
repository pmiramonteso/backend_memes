import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import Meme from './memeModel.js';

const Voto = sequelize.define('Voto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipo_voto: {
    type: DataTypes.INTEGER, // 1: "No me gusta", 2: "Me gusta", 3: "Me encanta"
    allowNull: false,
  },
}, {
  tableName: 'votos',
  timestamps: false,
});

Meme.hasMany(Voto, { foreignKey: 'meme_id', onDelete: 'CASCADE' });
Voto.belongsTo(Meme, { foreignKey: 'meme_id' });

export default Voto;

