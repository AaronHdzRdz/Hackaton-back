import express from 'express';
import { registrarAlimento, listarAlimentos } from '../controllers/alimentoController.js';

const router = express.Router();

router.post('/', registrarAlimento);
router.get('/', listarAlimentos);

export default router;

