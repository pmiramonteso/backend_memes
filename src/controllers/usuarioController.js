const { validationResult } = require('express-validator');
const Usuario = require('../models/usuarioModel');
const fs = require('fs');
const path = require('path');

const obtenerUsuario = async (req, res) => {
  try {
    console.log("Usuario autenticado en la petición:", req.usuario);

    if (!req.usuario) {
      return res.status(401).json({
        code: -200,
        message: "Usuario no autenticado"
      });
    }

    const usuario_data = {
      "id_usuario": req.usuario.id_usuario,
      "nombre": req.usuario.nombre,
      "apellidos": req.usuario.apellidos,
      "email": req.usuario.email,
      "roles": req.usuario.roles,
      "created_at": req.usuario.created_at,
      "updated_at": req.usuario.updated_at
    };

    res.status(200).json({
      code: 1,
      message: "Detalle Usuario",
      data: usuario_data 
    });
  } catch (error) {
    console.error("Error en obtenerUsuario:", error);

    res.status(500).json({
      code: -100,
      message: "Ocurrió un error al obtener el usuario",
      error: error.message
    });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { nombre, apellidos, email } = req.body;
    
    const usuario = await Usuario.findByPk(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    usuario.nombre = nombre || usuario.nombre;
    usuario.apellidos = apellidos || usuario.apellidos;
    usuario.email = email || usuario.email;
    await usuario.save();

    res.status(200).json({
      message: 'Usuario actualizado correctamente',
      usuario
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al actualizar el usuario',
      error
    });
  }
};

module.exports = {
  obtenerUsuario,
  actualizarUsuario
};
