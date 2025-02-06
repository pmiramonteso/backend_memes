const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel.js');

const authenticateToken = (allowedRoles) => async (req, res, next) => {
  try {
    let accessToken = null;

    // Busca el token en el Header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      accessToken = req.headers.authorization.split(' ')[1];
      console.log('Token extraído:', accessToken);
    }

    // Si no hay token en el header, busca en cookies
    if (!accessToken && req.cookies?.token) {
      accessToken = req.cookies.token;
      console.log('Token extraído de cookies:', accessToken);
    }

    if (!accessToken) {
      return res.status(401).json({
        code: -50,
        message: 'No se ha proporcionado un token de acceso'
      });
    }
    try {
      const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
      console.log('Token decodificado:', decodedToken);

      const usuario = await Usuario.findByPk(decodedToken.id_usuario);
      if (!usuario) {
        return res.status(401).json({
          code: -70,
          message: 'Usuario no encontrado'
        });
      }

      // Manejar los roles como array
      const userRoles = typeof usuario.roles === 'string' 
        ? usuario.roles.split(',').map(role => role.trim())
        : Array.isArray(usuario.roles) ? usuario.roles : [usuario.roles];

      console.log('Roles de usuario:', userRoles);
      console.log('Roles permitidos:', allowedRoles);

      const hasPermission = allowedRoles.some(role => userRoles.includes(role));
      
      if (!hasPermission) {
        return res.status(403).json({
          code: -10,
          message: 'No tiene los permisos necesarios'
        });
      }

      req.usuario = usuario;
      next();
      
    } catch (jwtError) {
      console.error('Error al verificar el token:', jwtError);
      return res.status(401).json({
        code: -60,
        message: 'Token inválido o expirado'
      });
    }

  } catch (error) {
    console.error('Error en authenticateToken:', error);
    return res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al autenticar el token de acceso',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { authenticateToken };
