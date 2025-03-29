import express from 'express';
import {
  registrarEntradaHistorial,
  obtenerHistorialPorMascota
} from '../controllers/historialController.js';
import { obtenerHistorialCompleto } from '../controllers/historialController.js';
import { exportarPdfHistorial } from '../controllers/historialController.js';

const router = express.Router();

router.post('/', registrarEntradaHistorial); // Registrar entrada
router.get('/:petId', obtenerHistorialPorMascota); // Obtener historial por mascota
router.get('/completo/:petId', obtenerHistorialCompleto);
router.get('/pdf/:petId', exportarPdfHistorial);

export default router;
