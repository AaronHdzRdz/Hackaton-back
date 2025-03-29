

import express from 'express';
import { generarRespuesta } from '../controllers/geminiController.js';

const router = express.Router();

// Ruta correcta
router.post('/chat', generarRespuesta);

export default router;
