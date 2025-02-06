const express = require('express');
const { authenticateToken } = require('../middlewares/authenticateToken.js');
const { verificarApiKey } = require('../middlewares/verificarApiKey.js');
const memeController = require('../controllers/memeController');
const { uploadFileMiddleware } = require("../middlewares/upload");

const router = express.Router();

// Rutas públicas (demo)
router.get('/public/all', memeController.obtenerMemes);
router.get('/public/categoria/:categoria', memeController.obtenerMemesPorCategoria);

// Rutas protegidas por API Key
router.get('/public/categoria/:categoria', memeController.obtenerMemesPorCategoria);
router.get('/memes', verificarApiKey, memeController.obtenerMemes);
router.get('/memes/:id', verificarApiKey, memeController.obtenerMemePorId);

// Rutas administrativas
router.post('/admin/memes', authenticateToken(['admin']), uploadFileMiddleware, memeController.agregarMeme); //authenticateToken(['admin']), para estos 3
router.patch('/admin/memes/:id', authenticateToken(['admin']), uploadFileMiddleware, memeController.actualizarMeme);
router.delete('/admin/memes/:id', authenticateToken(['admin']), memeController.eliminarMeme);

module.exports = router;
