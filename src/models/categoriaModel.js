const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const Categorias = sequelize.define('categorias', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    color_fondo: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    degradado: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    posicion_imagen: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    imagen: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'categorias',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['nombre']
        }
    ]
});

module.exports = Categorias;
