import express from 'express';
import { obtenerAlertasPorMascota,marcarAlertaComoAtendida,obtenerAlertasActivas } from '../controllers/alertaController.js';

const router = express.Router();

router.get('/:petId', obtenerAlertasPorMascota);
router.patch('/:id', marcarAlertaComoAtendida);
router.get('/activas/:petId', obtenerAlertasActivas);

export default router;
