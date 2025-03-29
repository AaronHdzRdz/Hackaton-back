import express from 'express';
import { obtenerRecomendacionNutricional } from '../controllers/nutricionController.js';

const router = express.Router();

router.get('/:petId', obtenerRecomendacionNutricional);

export default router;
