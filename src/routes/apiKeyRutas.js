const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authenticateToken');
const { verificarApiKey } = require('../middlewares/verificarApiKey');
const { obtenerApiKey, revocarApiKey } = require('../controllers/apiKeyController');


router.post('/generate', authenticateToken(['usuario', 'admin']), obtenerApiKey);
router.post('/revoke', verificarApiKey, revocarApiKey);

module.exports = router;