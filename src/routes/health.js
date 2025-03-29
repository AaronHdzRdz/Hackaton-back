import express from 'express';
import { createHealthData, getHealthStatus } from '../controllers/healthController.js';
import { generarPdfHistorial } from '../services/generatePdfService.js';
import Pet from '../models/pet.js';
import path from 'path'; // Asegúrate de importar path para manejar rutas de archivos
import fs from 'fs'; // Necesario para gestionar archivos en el servidor
import { HealthData } from '../models/HealthData.js';
import PDFDocument from 'pdfkit';


const router = express.Router();

// Ruta que usa el hardware para mandar datos (no requiere lógica de evaluación aquí)
router.post('/data', createHealthData);


router.get('/state/:petId', getHealthStatus);


router.get('/pdf/:petId', async (req, res) => {
  try {
    const { petId } = req.params;
    const mascota = await Pet.findById(petId);  
    const historial = await HealthData.find({ petId });  

    const pdfPath = await generarPdfHistorial(mascota, { historialClinico: [], saludAutomatica: historial, alimentacion: [] }); 

    const filePath = path.resolve(pdfPath); 

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        console.error('Archivo no encontrado:', err);
        return res.status(404).json({ message: 'Archivo PDF no encontrado' });
      }

      res.sendFile(filePath);
    });
  } catch (error) {
    console.error('Error generando el PDF:', error);
    res.status(500).json({ message: 'Error al generar el PDF' });
  }
});


// 👉 Ruta de prueba
router.get('/ping', (req, res) => {
  res.send('pong 🐶');
});







export default router;
