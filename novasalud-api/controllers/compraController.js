// controllers/compraController.js
const Compra = require('../models/compra');
const DetalleCompra = require('../models/detalleCompra');
const Producto = require('../models/producto');
const Proveedor = require('../models/proveedor');
const sequelize = require('../config/db');

// Crear compra
exports.crear = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { proveedor_id, usuario_id, detalles } = req.body;

    let totalCompra = 0;
    const nuevaCompra = await Compra.create({
      proveedor_id,
      usuario_id,
      total: 0
    }, { transaction });

    // Crear detalles de compra y actualizar stock
    for (const detalle of detalles) {
      const producto = await Producto.findByPk(detalle.producto_id);
      const subtotal = detalle.precio_unitario * detalle.cantidad;
      totalCompra += subtotal;

      await DetalleCompra.create({
        compra_id: nuevaCompra.id,
        producto_id: detalle.producto_id,
        cantidad: detalle.cantidad,
        precio_unitario: detalle.precio_unitario,
        subtotal
      }, { transaction });

      // Actualizar stock del producto
      await producto.update({
        stock_actual: producto.stock_actual + detalle.cantidad
      }, { transaction });
    }

    // Actualizar total de compra
    await nuevaCompra.update({ total: totalCompra }, { transaction });
    await transaction.commit();

    res.status(201).json({
      mensaje: 'Compra registrada exitosamente',
      compra: nuevaCompra
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ mensaje: 'Error al crear compra', error: error.message });
  }
};

// Obtener todas las compras
exports.obtenerTodos = async (req, res) => {
  try {
    const compras = await Compra.findAll({
      where: { estado: 'completada' },
      include: [
        { model: Proveedor, attributes: ['id', 'nombre'] },
        { model: DetalleCompra, include: [{ model: Producto }] }
      ]
    });
    res.json(compras);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener compras', error: error.message });
  }
};

// Obtener compra por ID
exports.obtenerPorId = async (req, res) => {
  try {
    const compra = await Compra.findByPk(req.params.id, {
      include: [
        { model: Proveedor },
        { model: DetalleCompra, include: [{ model: Producto }] }
      ]
    });

    if (!compra) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }

    res.json(compra);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener compra', error: error.message });
  }
};

// Anular compra (Lógico)
exports.anular = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const compra = await Compra.findByPk(req.params.id);

    if (!compra) {
      return res.status(404).json({ mensaje: 'Compra no encontrada' });
    }

    // Restaurar stock
    const detalles = await DetalleCompra.findAll({
      where: { compra_id: compra.id }
    });

    for (const detalle of detalles) {
      const producto = await Producto.findByPk(detalle.producto_id);
      await producto.update({
        stock_actual: producto.stock_actual - detalle.cantidad
      }, { transaction });
    }

    await compra.update({ estado: 'cancelada' }, { transaction });
    await transaction.commit();

    res.json({ mensaje: 'Compra anulada exitosamente' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ mensaje: 'Error al anular compra', error: error.message });
  }
};