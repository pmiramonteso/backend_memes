const { Router } = require('express');
const { obtenerUsuario, actualizarUsuario } = require('../controllers/usuarioController.js');
const { authenticateToken } = require('../middlewares/authenticateToken.js');

const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get('/perfil', obtenerUsuario);
router.patch('/:id', actualizarUsuario);

module.exports = router;
