import { Router } from 'express';
import votoController from '../controllers/votoController.js';

const router = Router();

router.post('/votos/meme/:id', votoController.votarMeme);
router.get('/votos/meme/:id', votoController.obtenerVotosPorMeme);

export default router;
