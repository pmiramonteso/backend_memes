const { Router } = require('express');
const { authenticateToken } = require('../middlewares/authenticateToken.js');
const { allAccess, userBoard, moderatorBoard, adminBoard } = require('../controllers/testController.js');

const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get('/all', allAccess);
router.get('/usuario', authenticateToken(['usuario']), userBoard);
router.get('/admin', authenticateToken(['admin']), adminBoard);

module.exports = router;
