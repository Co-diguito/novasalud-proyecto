// controllers/proveedorController.js
const Proveedor = require('../models/proveedor');

// Crear proveedor
exports.crear = async (req, res) => {
  try {
    const { nombre, contacto, telefono, email, direccion } = req.body;

    const nuevoProveedor = await Proveedor.create({
      nombre,
      contacto,
      telefono,
      email,
      direccion
    });

    res.status(201).json({
      mensaje: 'Proveedor creado exitosamente',
      proveedor: nuevoProveedor
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear proveedor', error: error.message });
  }
};

// Obtener todos los proveedores
exports.obtenerTodos = async (req, res) => {
  try {
    const proveedores = await Proveedor.findAll({
      where: { estado: 'activo' }
    });
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener proveedores', error: error.message });
  }
};

// Obtener proveedor por ID
exports.obtenerPorId = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);

    if (!proveedor) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }

    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener proveedor', error: error.message });
  }
};

// Actualizar proveedor
exports.actualizar = async (req, res) => {
  try {
    const { nombre, contacto, telefono, email, direccion } = req.body;
    const proveedor = await Proveedor.findByPk(req.params.id);

    if (!proveedor) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }

    await proveedor.update({ nombre, contacto, telefono, email, direccion });
    res.json({ mensaje: 'Proveedor actualizado', proveedor });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar proveedor', error: error.message });
  }
};

// Eliminar proveedor (Lógico)
exports.eliminar = async (req, res) => {
  try {
    const proveedor = await Proveedor.findByPk(req.params.id);

    if (!proveedor) {
      return res.status(404).json({ mensaje: 'Proveedor no encontrado' });
    }

    await proveedor.update({ estado: 'inactivo' });
    res.json({ mensaje: 'Proveedor eliminado lógicamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar proveedor', error: error.message });
  }
};