const ApiKey = require('../models/apiKeyModel');

const verificarApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
      return res.status(401).json({ message: 'API Key no proporcionada' });
    }

    const apiKeyRecord = await ApiKey.findOne({ 
      where: { 
        key: apiKey,
        status: 'activo'
      } 
    });

    if (!apiKeyRecord) {
      return res.status(401).json({ message: 'API Key no válida o revocada' });
    }

    req.usuarioId = apiKeyRecord.usuario_id;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al verificar la API Key' });
  }
};

module.exports = {
  verificarApiKey
};
  