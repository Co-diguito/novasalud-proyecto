// routes/ventas.js
const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const { autenticacion, verificarRol } = require('../middleware/autenticacion');
const { validarVenta } = require('../middleware/validacion');

router.post('/', autenticacion, verificarRol(['vendedor']), validarVenta, ventaController.crear);
router.get('/', autenticacion, ventaController.obtenerTodos);
router.get('/fecha', autenticacion, ventaController.obtenerPorFecha);
router.get('/:id', autenticacion, ventaController.obtenerPorId);
router.put('/:id/anular', autenticacion, verificarRol(['admin', 'vendedor']), ventaController.anular);

module.exports = router;