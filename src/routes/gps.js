import express from 'express';
import {
  obtenerUltimaUbicacion,
  obtenerHistorialUbicaciones,
  simularUbicacion
} from '../controllers/gpsController.js';

const router = express.Router();

// Endpoints
router.get('/ultima/:petId', obtenerUltimaUbicacion);
router.get('/historial/:petId', obtenerHistorialUbicaciones);
router.post('/simular', simularUbicacion);

export default router;
