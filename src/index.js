import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

import authRutas from './routes/authRutas.js';
import usuarioRutas from './routes/usuarioRutas.js';
import testRoutes from './routes/testRutas.js';
import memeRutas from './routes/memeRutas.js';
import categoriaRutas from './routes/categoriaRutas.js';
import votosRutas from './routes/votosRutas.js';
import apiKeyRutas from './routes/apiKeyRutas.js';

import { verificarApiKey } from './middlewares/verificarApiKey.js';
import { testConnection } from './db.js';
import { authenticateToken } from './middlewares/authenticateToken.js';

import { insertInitialUserData } from './start_data.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors({
  origin: ['https://lasociedadelmeme.com', 'http://lasociedadelmeme.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie'],
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  await testConnection();
  await insertInitialUserData();
})();

app.use('/assets/img', express.static(path.join(__dirname, '/uploads')));

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '/frontend')));

// Rutas administrativas
app.use('/api/admin/memes', authenticateToken(['admin']), memeRutas);
app.use('/api/admin/categorias', authenticateToken(['admin']), categoriaRutas);

// Rutas públicas
app.use('/auth', authRutas);
app.use('/api', categoriaRutas);
app.use('/api', memeRutas);

// Rutas protegidas por usuario
app.use('/usuario', usuarioRutas);
app.use('/api/keys', apiKeyRutas);

// Rutas protegidas por API Key
app.use('/api/v1', verificarApiKey, memeRutas);

// Redirigir todas las rutas no específicas de la API a index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor de Express escuchando en el puerto ` + PORT);
});

