// routes/compras.js
const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');
const { autenticacion, verificarRol } = require('../middleware/autenticacion');

router.post('/', autenticacion, verificarRol(['encargado_inventario']), compraController.crear);
router.get('/', autenticacion, compraController.obtenerTodos);
router.get('/:id', autenticacion, compraController.obtenerPorId);
router.put('/:id/anular', autenticacion, verificarRol(['admin']), compraController.anular);

module.exports = router;