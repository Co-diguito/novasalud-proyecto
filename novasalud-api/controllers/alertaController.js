// controllers/alertaController.js
const AlertaStock = require('../models/alertaStock');
const Producto = require('../models/producto');

// Obtener todas las alertas nuevas
exports.obtenerAlertas = async (req, res) => {
  try {
    const alertas = await AlertaStock.findAll({
      where: { estado: 'nueva' },
      include: [{ model: Producto, attributes: ['id', 'nombre', 'stock_actual', 'stock_minimo'] }]
    });
    res.json(alertas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener alertas', error: error.message });
  }
};

// Marcar alerta como vista
exports.marcarVista = async (req, res) => {
  try {
    const alerta = await AlertaStock.findByPk(req.params.id);

    if (!alerta) {
      return res.status(404).json({ mensaje: 'Alerta no encontrada' });
    }

    await alerta.update({ estado: 'vista' });
    res.json({ mensaje: 'Alerta marcada como vista' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar alerta', error: error.message });
  }
};

// Marcar alerta como resuelta
exports.marcarResuelta = async (req, res) => {
  try {
    const alerta = await AlertaStock.findByPk(req.params.id);

    if (!alerta) {
      return res.status(404).json({ mensaje: 'Alerta no encontrada' });
    }

    await alerta.update({ estado: 'resuelta' });
    res.json({ mensaje: 'Alerta marcada como resuelta' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar alerta', error: error.message });
  }
};

// Obtener resumen de alertas
exports.obtenerResumen = async (req, res) => {
  try {
    const alertas = await AlertaStock.findAll({
      include: [{ model: Producto }]
    });

    const resumen = {
      totalAlertas: alertas.length,
      alertasNuevas: alertas.filter(a => a.estado === 'nueva').length,
      alertasVistas: alertas.filter(a => a.estado === 'vista').length,
      alertasResueltas: alertas.filter(a => a.estado === 'resuelta').length,
      bajoStock: alertas.filter(a => a.tipo_alerta === 'bajo_stock').length,
      sinStock: alertas.filter(a => a.tipo_alerta === 'sin_stock').length,
      porVencer: alertas.filter(a => a.tipo_alerta === 'por_vencer').length
    };

    res.json(resumen);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener resumen', error: error.message });
  }
};