const Voto = require('../models/votosModel');

const votarMeme = async (req, res) => {
  try {
    const { tipo_voto } = req.body; // tipo_voto puede ser 1, 2 , 3
    const memeId = req.params.id;

    const meme = await Meme.findByPk(memeId);
    if (!meme) {
      return res.status(404).json({ message: 'Meme no encontrado' });
    }

    // Crear el voto
    const voto = await Voto.create({ meme_id: memeId, tipo_voto });

    // Actualizar el contador de votos en el meme
    if (tipo_voto === 1) {
      meme.votos_no_me_gusta += 1;
    } else if (tipo_voto === 2) {
      meme.votos_me_gusta += 1;
    } else if (tipo_voto === 3) {
      meme.votos_me_encanta += 1;
    }

    await meme.save();
    res.status(201).json({ mensaje: 'Voto registrado correctamente', voto });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar el voto', error });
  }
};

const obtenerVotosPorMeme = async (req, res) => {
  try {
    const memeId = req.params.id;
    const votos = await Voto.findAll({ where: { meme_id: memeId } });
    res.status(200).json(votos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los votos del meme', error });
  }
};

module.exports = {
  votarMeme,
  obtenerVotosPorMeme,
};
