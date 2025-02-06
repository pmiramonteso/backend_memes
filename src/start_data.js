const Usuario = require('./models/usuarioModel');

const insertInitialUserData = async () => {

  const usuarioData = [ 
    // Inserta los datos de usuario aquí si es necesario
  ];

  // Insertar datos con opción ignoreDuplicates
  // Para actualizar todas las filas: updateOnDuplicate: Object.keys(User.rawAttributes)
  await Usuario.bulkCreate(usuarioData, { ignoreDuplicates: true });
};

module.exports = { insertInitialUserData };