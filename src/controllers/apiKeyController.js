const crypto = require('crypto');
const ApiKey = require('../models/apiKeyModel');

const generateApiKey = async (usuarioId) => {
  let apiKey;
  let exists = true;

  while (exists) {
    apiKey = crypto.randomBytes(32).toString("hex");
    const existingKey = await ApiKey.findOne({ where: { key: apiKey } });
    if (!existingKey) exists = false;
  }

  const newApiKey = await ApiKey.create({
    key: apiKey,
    usuario_id: usuarioId,
    status: 'activo',
  });

  return newApiKey.key;
};

const obtenerApiKey = async (req, res) => {
  try {
    const usuarioId = req.usuario.id_usuario;

    const existingApiKey = await ApiKey.findOne({ where: { usuario_id: usuarioId } });

    if (existingApiKey) {
      existingApiKey.status = 'revocado';
      await existingApiKey.save();
    }

    const apiKey = await generateApiKey(usuarioId);

    res.status(200).json({
      message: 'API Key generada correctamente',
      apiKey: apiKey,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al generar la API Key' });
  }
};


  const revocarApiKey = async (req, res) => {
    try {
      const apiKey = req.headers['x-api-key'];
  
      if (!apiKey) {
        return res.status(400).json({ message: 'API Key no proporcionada' });
      }
  
      const apiKeyRecord = await ApiKey.findOne({ where: { key: apiKey } });
      if (!apiKeyRecord) {
        return res.status(400).json({ message: 'API Key no válida' });
      }
  
      apiKeyRecord.status = 'revocado';
      await apiKeyRecord.save();
  
      res.status(200).json({ message: 'API Key revocada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al revocar la API Key' });
    }
  };
  
  module.exports = {
    generateApiKey,
    obtenerApiKey,
    revocarApiKey
  };
  
