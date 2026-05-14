// controllers/ventaController.js
const Venta = require('../models/venta');
const DetalleVenta = require('../models/detalleVenta');
const Producto = require('../models/producto');
const AlertaStock = require('../models/alertaStock');
const sequelize = require('../config/db');

// Crear venta
exports.crear = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { cliente_nombre, cliente_dni, cliente_telefono, usuario_id, detalles } = req.body;

    // Validar stock disponible
    for (const detalle of detalles) {
      const producto = await Producto.findByPk(detalle.producto_id);
      if (!producto || producto.stock_actual < detalle.cantidad) {
        await transaction.rollback();
        return res.status(400).json({ mensaje: `Stock insuficiente para ${producto?.nombre}` });
      }
    }

    // Crear venta
    let totalVenta = 0;
    const nuevaVenta = await Venta.create({
      cliente_nombre,
      cliente_dni,
      cliente_telefono,
      usuario_id,
      total: 0
    }, { transaction });

    // Crear detalles de venta
    for (const detalle of detalles) {
      const producto = await Producto.findByPk(detalle.producto_id);
      const subtotal = producto.precio_venta * detalle.cantidad;
      totalVenta += subtotal;

      await DetalleVenta.create({
        venta_id: nuevaVenta.id,
        producto_id: detalle.producto_id,
        cantidad: detalle.cantidad,
        precio_unitario: producto.precio_venta,
        subtotal
      }, { transaction });

      // Actualizar stock
      await producto.update({
        stock_actual: producto.stock_actual - detalle.cantidad
      }, { transaction });

      // Generar alerta si stock es bajo
      if (producto.stock_actual - detalle.cantidad <= producto.stock_minimo) {
        await AlertaStock.create({
          producto_id: producto.id,
          tipo_alerta: 'bajo_stock',
          mensaje: `Stock bajo para ${producto.nombre}`
        }, { transaction });
      }
    }

    // Actualizar total de venta
    await nuevaVenta.update({ total: totalVenta }, { transaction });
    await transaction.commit();

    res.status(201).json({
      mensaje: 'Venta registrada exitosamente',
      venta: nuevaVenta
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ mensaje: 'Error al crear venta', error: error.message });
  }
};

// Obtener todas las ventas
exports.obtenerTodos = async (req, res) => {
  try {
    const ventas = await Venta.findAll({
      where: { estado: 'completada' },
      include: [{ model: DetalleVenta, include: [{ model: Producto }] }]
    });
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ventas', error: error.message });
  }
};

// Obtener venta por ID
exports.obtenerPorId = async (req, res) => {
  try {
    const venta = await Venta.findByPk(req.params.id, {
      include: [{ model: DetalleVenta, include: [{ model: Producto }] }]
    });

    if (!venta) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    res.json(venta);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener venta', error: error.message });
  }
};

// Anular venta (Lógico)
exports.anular = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const venta = await Venta.findByPk(req.params.id);

    if (!venta) {
      return res.status(404).json({ mensaje: 'Venta no encontrada' });
    }

    // Restaurar stock
    const detalles = await DetalleVenta.findAll({
      where: { venta_id: venta.id }
    });

    for (const detalle of detalles) {
      const producto = await Producto.findByPk(detalle.producto_id);
      await producto.update({
        stock_actual: producto.stock_actual + detalle.cantidad
      }, { transaction });
    }

    await venta.update({ estado: 'cancelada' }, { transaction });
    await transaction.commit();

    res.json({ mensaje: 'Venta anulada exitosamente' });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ mensaje: 'Error al anular venta', error: error.message });
  }
};

// Obtener ventas por rango de fechas
exports.obtenerPorFecha = async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query;
    
    const ventas = await Venta.findAll({
      where: {
        estado: 'completada',
        fecha: {
          [sequelize.Op.between]: [new Date(fechaInicio), new Date(fechaFin)]
        }
      },
      include: [{ model: DetalleVenta, include: [{ model: Producto }] }]
    });

    res.json(ventas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener ventas', error: error.message });
  }
};