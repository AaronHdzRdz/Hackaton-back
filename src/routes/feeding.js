import express from 'express';
import {
  registrarFeeding,
  historialFeeding,
  ultimaFeeding,
  resumenFeeding
} from '../controllers/feedingController.js';

const router = express.Router();

router.post('/', registrarFeeding);
router.get('/historial/:petId', historialFeeding);
router.get('/ultima/:petId', ultimaFeeding);
router.get('/resumen/:petId', resumenFeeding);

export default router;
