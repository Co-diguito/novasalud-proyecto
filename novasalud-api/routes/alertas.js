// routes/alertas.js
const express = require('express');
const router = express.Router();
const alertaController = require('../controllers/alertaController');
const { autenticacion } = require('../middleware/autenticacion');

router.get('/', autenticacion, alertaController.obtenerAlertas);
router.get('/resumen', autenticacion, alertaController.obtenerResumen);
router.put('/:id/vista', autenticacion, alertaController.marcarVista);
router.put('/:id/resuelta', autenticacion, alertaController.marcarResuelta);

module.exports = router;