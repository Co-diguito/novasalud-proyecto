// middleware/validacion.js
const validarProducto = (req, res, next) => {
  const { nombre, precio_venta } = req.body;

  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ mensaje: 'El nombre es requerido' });
  }

  if (!precio_venta || precio_venta <= 0) {
    return res.status(400).json({ mensaje: 'El precio de venta debe ser mayor a 0' });
  }

  next();
};

const validarVenta = (req, res, next) => {
  const { cliente_nombre, detalles } = req.body;

  if (!cliente_nombre || cliente_nombre.trim() === '') {
    return res.status(400).json({ mensaje: 'El nombre del cliente es requerido' });
  }

  if (!Array.isArray(detalles) || detalles.length === 0) {
    return res.status(400).json({ mensaje: 'Debe incluir al menos un producto' });
  }

  next();
};

module.exports = { validarProducto, validarVenta };