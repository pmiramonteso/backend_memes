const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');
const Categorias = require('./categoriaModel.js');

const Meme = sequelize.define('memes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    imagen: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    categoria_nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
}, {
    tableName: 'memes',
    timestamps: false,
});

Meme.belongsTo(Categorias, { 
    foreignKey: 'categoria_nombre',
    targetKey: 'nombre',
    as: 'categoria',
    onUpdate: 'CASCADE',
    onDelete: 'RESTRICT'
});

Categorias.hasMany(Meme, { 
    foreignKey: 'categoria_nombre',
    sourceKey: 'nombre',
    as: 'memes'
});

module.exports = Meme;