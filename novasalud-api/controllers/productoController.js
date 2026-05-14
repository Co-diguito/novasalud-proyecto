// controllers/productoController.js
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const AlertaStock = require('../models/alertaStock');

// Crear producto
exports.crear = async (req, res) => {
  try {
    const { codigo_barras, nombre, descripcion, categoria_id, precio_compra, precio_venta, stock_minimo, lote, fecha_vencimiento } = req.body;

    const nuevoProducto = await Producto.create({
      codigo_barras,
      nombre,
      descripcion,
      categoria_id,
      precio_compra,
      precio_venta,
      stock_minimo,
      lote,
      fecha_vencimiento
    });

    res.status(201).json({
      mensaje: 'Producto creado exitosamente',
      producto: nuevoProducto
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear producto', error: error.message });
  }
};

// Obtener todos los productos
exports.obtenerTodos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      where: { estado: 'activo' },
      include: [{ model: Categoria, attributes: ['id', 'nombre'] }]
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
};

// Obtener producto por ID
exports.obtenerPorId = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, {
      include: [{ model: Categoria }]
    });

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener producto', error: error.message });
  }
};

// Actualizar producto
exports.actualizar = async (req, res) => {
  try {
    const { nombre, descripcion, precio_venta, stock_minimo, lote, fecha_vencimiento } = req.body;
    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await producto.update({
      nombre,
      descripcion,
      precio_venta,
      stock_minimo,
      lote,
      fecha_vencimiento
    });

    res.json({ mensaje: 'Producto actualizado', producto });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar producto', error: error.message });
  }
};

// Eliminar producto (Lógico)
exports.eliminar = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);

    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    await producto.update({ estado: 'inactivo' });
    res.json({ mensaje: 'Producto eliminado lógicamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar producto', error: error.message });
  }
};

// Obtener productos con bajo stock
exports.obtenerBajoStock = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      where: {
        estado: 'activo',
        sequelize: require('sequelize')
      },
      include: [{ model: Categoria }]
    });

    const productosBajo = productos.filter(p => p.stock_actual <= p.stock_minimo);
    res.json(productosBajo);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
};