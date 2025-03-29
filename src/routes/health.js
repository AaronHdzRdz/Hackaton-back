import express from 'express';
import {
  createHealthData,
  getHealthStatus
} from '../controllers/healthController.js'

const router = express.Router();

// Ruta que usa el hardware para mandar datos (no requiere lógica de evaluación aquí)
router.post('/data', createHealthData);

// Ruta que consulta el estado actual (usa evaluación personalizada)
router.get('/state/:petId', getHealthStatus);

export default router;
