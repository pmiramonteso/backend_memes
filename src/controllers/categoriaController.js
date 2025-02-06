const Categoria = require('../models/categoriaModel');

const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías', error });
  }
};

const obtenerCategoriaPorId = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la categoría', error });
  }
};

const agregarCategoria = async (req, res) => {
    try {
      const { nombre, color_fondo, degradado, posicion_imagen, descripcion } = req.body;
      const imagen = req.file ? req.file.filename : '';
  
      const nuevaCategoria = await Categoria.create({
        nombre,
        color_fondo,
        degradado,
        posicion_imagen,
        imagen,
        descripcion
      });
  
      res.status(201).json(nuevaCategoria);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar la categoría', error: error.message });
    }
  };
  

  const actualizarCategoria = async (req, res) => {
    try {
      const { nombre, color_fondo, degradado, posicion_imagen, imagen, descripcion } = req.body;
      
      const categoria = await Categoria.findByPk(req.params.id);
  
      if (!categoria) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }

      categoria.nombre = nombre || categoria.nombre;
      categoria.color_fondo = color_fondo || categoria.color_fondo;
      categoria.degradado = degradado || categoria.degradado;
      categoria.posicion_imagen = posicion_imagen || categoria.posicion_imagen;
      categoria.imagen = imagen || categoria.imagen;
      categoria.descripcion = descripcion || categoria.descripcion;
  
      await categoria.save();
  
      res.status(200).json({ message: 'Categoría actualizada correctamente', categoria });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la categoría', error });
    }
  };
  

const eliminarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    await categoria.destroy();
    res.status(200).json({ message: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la categoría', error });
  }
};

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  agregarCategoria,
  actualizarCategoria,
  eliminarCategoria,
};
