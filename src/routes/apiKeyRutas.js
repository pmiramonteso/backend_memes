import express from 'express';
const router = express.Router();
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { verificarApiKey } from '../middlewares/verificarApiKey.js';
import { obtenerApiKey, revocarApiKey } from '../controllers/apiKeyController.js';

router.post('/generate', authenticateToken(['usuario', 'admin']), obtenerApiKey);
router.post('/revoke', verificarApiKey, revocarApiKey);

export default router;
