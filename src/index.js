import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import authRutas from './routes/authRutas.js';
import usuarioRutas from './routes/usuarioRutas.js';
import testRoutes from './routes/testRutas.js';
import memeRutas from './routes/memeRutas.js';
import categoriaRutas from './routes/categoriaRutas.js';
import votosRutas from './routes/votosRutas.js';
import apiKeyRutas from './routes/apiKeyRutas.js';

import { verificarApiKey } from './middlewares/verificarApiKey.js';
import { testConnection, sequelize } from './db.js';
import { authenticateToken } from './middlewares/authenticateToken.js';
import { insertInitialUserData } from './start_data.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

sequelize.sync({ alter: true }).then(() => {
  console.log('Modelos sincronizados con la base de datos');
}).catch(error => {
  console.error('Error al sincronizar los modelos con la base de datos:', error);
});

// Middlewares
app.use(cors({
  credentials: true,
  origin: ['https://lasociedadelmeme.com',
  'http://lasociedadelmeme.com',
  'http://localhost:4200',
  'https://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie'],
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initializeApp = async () => {
  try {
    await testConnection();
    //await insertInitialUserData();
    console.log('Conexión a base de datos establecida');
  } catch (error) {
    console.error('Error al inicializar la aplicación:', error);
  }
};

initializeApp();

app.use('/assets/img', express.static(path.join(__dirname, '/uploads')));

// Servir archivos estáticos del frontend
app.use(express.static(path.resolve(__dirname, '../../../frontend')));

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
  res.sendFile(path.resolve(__dirname, '../../../frontend', 'index.html'));
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
      console.log(`Servidor de desarrollo escuchando en el puerto ${PORT}`);
  });
} else {
  console.log('Servidor iniciado en modo producción con Passenger');
}

