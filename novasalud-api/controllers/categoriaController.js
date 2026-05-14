// controllers/categoriaController.js
const Categoria = require('../models/categoria');

// Crear categoría
exports.crear = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    const nuevaCategoria = await Categoria.create({
      nombre,
      descripcion
    });

    res.status(201).json({
      mensaje: 'Categoría creada exitosamente',
      categoria: nuevaCategoria
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear categoría', error: error.message });
  }
};

// Obtener todas las categorías
exports.obtenerTodos = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      where: { estado: 'activo' }
    });
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener categorías', error: error.message });
  }
};

// Obtener categoría por ID
exports.obtenerPorId = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    res.json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener categoría', error: error.message });
  }
};

// Actualizar categoría
exports.actualizar = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const categoria = await Categoria.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    await categoria.update({ nombre, descripcion });
    res.json({ mensaje: 'Categoría actualizada', categoria });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar categoría', error: error.message });
  }
};

// Eliminar categoría (Lógico)
exports.eliminar = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);

    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    await categoria.update({ estado: 'inactivo' });
    res.json({ mensaje: 'Categoría eliminada lógicamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar categoría', error: error.message });
  }
};