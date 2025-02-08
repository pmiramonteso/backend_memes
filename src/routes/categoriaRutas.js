import express from 'express';
import * as categoriaController from '../controllers/categoriaController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { uploadFileMiddleware } from "../middlewares/upload.js";

const router = express.Router();

// Rutas públicas
router.get('/public/categorias', categoriaController.obtenerCategorias);

// Rutas protegidas por API Key
router.get('/v1/categorias', categoriaController.obtenerCategorias);
router.get('/v1/categorias/:id', categoriaController.obtenerCategoriaPorId);

// Rutas administrativas
router.post('/admin/categorias', authenticateToken(['admin']), uploadFileMiddleware, categoriaController.agregarCategoria);
router.put('/admin/categorias/:id', authenticateToken(['admin']), uploadFileMiddleware, categoriaController.actualizarCategoria);
router.delete('/admin/categorias/:id', authenticateToken(['admin']), categoriaController.eliminarCategoria);

export default router;



