const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

const authRutas = require('./routes/authRutas.js');
const usuarioRutas = require('./routes/usuarioRutas.js');
const memeRutas = require('./routes/memeRutas.js');
const categoriaRutas = require('./routes/categoriaRutas.js');
const apiKeyRutas = require('./routes/apiKeyRutas.js');

const { verificarApiKey } = require('./middlewares/verificarApiKey.js');
const { testConnection, sequelize } = require('./db.js');
const { authenticateToken } = require('./middlewares/authenticateToken.js');

// Configuración de dotenv
dotenv.config();
const app = express();

// Sincronización con la base de datos
sequelize.sync({ alter: true }).then(() => {
  console.log('Modelos sincronizados con la base de datos');
}).catch(error => {
  console.error('Error al sincronizar los modelos con la base de datos:', error);
});

// Middlewares
app.use(cors({
  credentials: true,
  origin: [
    'https://lasociedadelmeme.com',
    'http://localhost:4200',
    'https://localhost:4200'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie']
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const initializeApp = async () => {
  try {
    await testConnection();
    console.log('Conexión a base de datos establecida');
  } catch (error) {
    console.error('Error al inicializar la aplicación:', error);
  }
};

initializeApp();

app.use('/assets/img', express.static(path.join(__dirname, '/uploads')));

// Servir archivos estáticos del frontend
app.use(express.static(path.resolve(__dirname, '../../lasociedadelmeme.com/index.html')));

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
  res.sendFile(path.resolve(__dirname, '../../lasociedadelmeme.com/index.html'));
});

if (process.env.NODE_ENV === 'development') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor en ejecución en http://0.0.0.0:${PORT}`);
  }).on('error', (err) => {
    console.error('Error al iniciar el servidor:', err);
  });
} else {
  module.exports = app;
}

