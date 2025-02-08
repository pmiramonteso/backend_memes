import Usuario from './models/usuarioModel.js';

const insertInitialUserData = async () => {

  const usuarioData = [ 
    // Inserta los datos de usuario aquí si es necesario
  ];

  // Insertar datos con opción ignoreDuplicates
  // Para actualizar todas las filas: updateOnDuplicate: Object.keys(User.rawAttributes)
  await Usuario.bulkCreate(usuarioData, { ignoreDuplicates: true });
};

export { insertInitialUserData };
