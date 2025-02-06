const express = require('express');
const router = express.Router();
const votoController = require('../controllers/votoController');

router.post('/votos/meme/:id', votoController.votarMeme);
router.get('/votos/meme/:id', votoController.obtenerVotosPorMeme);

module.exports = router;
