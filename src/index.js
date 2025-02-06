const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRutas = require('./routes/authRutas');
const usuarioRutas = require('./routes/usuarioRutas');
const testRoutes = require('./routes/testRutas');
const memeRutas = require('./routes/memeRutas');
const categoriaRutas = require('./routes/categoriaRutas')
const votosRutas = require('./routes/votosRutas');
const apiKeyRutas = require('./routes/apiKeyRutas');
const { verificarApiKey } = require('./middlewares/verificarApiKey');
const { testConnection } = require('./db');
const { authenticateToken } = require('./middlewares/authenticateToken');
const { insertInitialUserData } = require('./start_data');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:4200',
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


// Rutas administrativas
app.use('/api/admin/memes', authenticateToken(['admin']), memeRutas);
app.use('/api/admin/categorias', authenticateToken(['admin']), categoriaRutas);

// Rutas públicas
app.use('/auth', authRutas);
//app.use('/api/docs');
app.use('/api', categoriaRutas);
app.use('/api', memeRutas); // Rutas de demostración pública

// Rutas protegidas por usuario
app.use('/usuario', usuarioRutas);
app.use('/api/keys', apiKeyRutas); // Gestión de API Keys

// Rutas protegidas por API Key
app.use('/api/v1', verificarApiKey, memeRutas); // API para desarrolladores

app.listen(3000, () => {
  console.log(`Servidor de Express escuchando en el puerto 3000`);
});