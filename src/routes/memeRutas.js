import express from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { verificarApiKey } from '../middlewares/verificarApiKey.js';
import * as memeController from '../controllers/memeController.js';
import { uploadFileMiddleware } from "../middlewares/upload.js";

const router = express.Router();

// Rutas públicas (demo)
router.get('/public/all', memeController.obtenerMemes);
router.get('/public/categoria/:categoria', memeController.obtenerMemesPorCategoria);

// Rutas protegidas por API Key
router.get('/public/categoria/:categoria', memeController.obtenerMemesPorCategoria);
router.get('/memes', verificarApiKey, memeController.obtenerMemes);
router.get('/memes/:id', verificarApiKey, memeController.obtenerMemePorId);

// Rutas administrativas
router.post('/admin/memes', authenticateToken(['admin']), uploadFileMiddleware, memeController.agregarMeme);
router.patch('/admin/memes/:id', authenticateToken(['admin']), uploadFileMiddleware, memeController.actualizarMeme);
router.delete('/admin/memes/:id', authenticateToken(['admin']), memeController.eliminarMeme);

export default router;
