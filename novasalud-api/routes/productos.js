// routes/productos.js
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');
const { autenticacion, verificarRol } = require('../middleware/autenticacion');
const { validarProducto } = require('../middleware/validacion');

// Rutas protegidas
router.post('/', autenticacion, validarProducto, productoController.crear);
router.get('/', autenticacion, productoController.obtenerTodos);
router.get('/bajo-stock', autenticacion, productoController.obtenerBajoStock);
router.get('/:id', autenticacion, productoController.obtenerPorId);
router.put('/:id', autenticacion, verificarRol(['admin', 'encargado_inventario']), productoController.actualizar);
router.delete('/:id', autenticacion, verificarRol(['admin']), productoController.eliminar);

module.exports = router;