const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const { authenticateToken } = require('../middlewares/authenticateToken.js');
const router = express.Router();
const { uploadFileMiddleware } = require("../middlewares/upload");

// Rutas públicas
router.get('/public/categorias', categoriaController.obtenerCategorias);

// Rutas protegidas por API Key
router.get('/v1/categorias', categoriaController.obtenerCategorias);
router.get('/v1/categorias/:id', categoriaController.obtenerCategoriaPorId);

// Rutas administrativas
router.post('/admin/categorias', authenticateToken(['admin']), uploadFileMiddleware, categoriaController.agregarCategoria);
router.put('/admin/categorias/:id',  authenticateToken(['admin']), uploadFileMiddleware, categoriaController.actualizarCategoria);
router.delete('/admin/categorias/:id',  authenticateToken(['admin']), categoriaController.eliminarCategoria);

module.exports = router;


