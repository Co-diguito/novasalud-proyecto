// routes/usuarios.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { autenticacion, verificarRol } = require('../middleware/autenticacion');

// Rutas públicas
router.post('/registro', usuarioController.registrar);
router.post('/login', usuarioController.login);

// Rutas protegidas
router.get('/', autenticacion, usuarioController.obtenerTodos);
router.get('/:id', autenticacion, usuarioController.obtenerPorId);
router.put('/:id', autenticacion, verificarRol(['admin']), usuarioController.actualizar);
router.delete('/:id', autenticacion, verificarRol(['admin']), usuarioController.eliminar);

module.exports = router;