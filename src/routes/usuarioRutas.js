import { Router } from 'express';
import { obtenerUsuario, actualizarUsuario } from '../controllers/usuarioController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get('/perfil', obtenerUsuario);
router.patch('/:id', actualizarUsuario);

export default router;

