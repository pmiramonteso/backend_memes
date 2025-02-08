import { Router } from 'express';
import { votarMeme, obtenerVotosPorMeme } from '../controllers/votoController.js';

const router = Router();

router.post('/votos/meme/:id', votarMeme);
router.get('/votos/meme/:id', obtenerVotosPorMeme);

export default router;
