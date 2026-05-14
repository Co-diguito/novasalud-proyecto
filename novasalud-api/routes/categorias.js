// routes/categorias.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const { autenticacion, verificarRol } = require('../middleware/autenticacion');

router.post('/', autenticacion, verificarRol(['admin']), categoriaController.crear);
router.get('/', autenticacion, categoriaController.obtenerTodos);
router.get('/:id', autenticacion, categoriaController.obtenerPorId);
router.put('/:id', autenticacion, verificarRol(['admin']), categoriaController.actualizar);
router.delete('/:id', autenticacion, verificarRol(['admin']), categoriaController.eliminar);

module.exports = router;