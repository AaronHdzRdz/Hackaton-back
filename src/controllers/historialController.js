import { HistorialClinico } from '../models/HistorialClinico.js';
import { HealthData } from '../models/HealthData.js';
import { FeedingLog } from '../models/FeedingLog.js';
import mongoose from 'mongoose';
import Pet from '../models/pet.js'
import { generarPdfHistorial } from '../services/generatePdfService.js';
// Registrar entrada manual en historial
export const registrarEntradaHistorial = async (req, res) => {
  try {
    const nuevaEntrada = await HistorialClinico.create(req.body);
    res.status(201).json({ message: 'Entrada registrada.', entrada: nuevaEntrada });
  } catch (error) {
    console.error('Error al registrar historial:', error);
    res.status(500).json({ message: 'Error al registrar historial.' });
  }
};

// Consultar historial por mascota
export const obtenerHistorialPorMascota = async (req, res) => {
  try {
    const { petId } = req.params;
    const historial = await HistorialClinico.find({ petId }).sort({ fecha: -1 });
    res.json(historial);
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ message: 'Error al obtener historial clínico.' });
  }
};
export const obtenerHistorialCompleto = async (req, res) => {
    try {
      const { petId } = req.params;
      console.log('🐾 Buscando historial para petId:', petId);
  
      const filtroId = new mongoose.Types.ObjectId(petId);
  
      const historialManual = await HistorialClinico.find({ petId: filtroId }).sort({ fecha: -1 });
  
      const todosSalud = await HealthData.find().sort({ timestamp: -1 });
      const datosSalud = todosSalud.filter(item => item.petId.toString() === petId);
  
      const todosFeeding = await FeedingLog.find().sort({ timestamp: -1 });
      const alimentacion = todosFeeding.filter(item => item.petId.toString() === petId);
  
      res.json({
        historialClinico: historialManual,
        saludAutomatica: datosSalud,
        alimentacion
      });
    } catch (error) {
      console.error('Error al obtener historial completo:', error);
      res.status(500).json({ message: 'Error al obtener historial completo' });
    }
  };

export const exportarPdfHistorial = async (req, res) => {
    try {
      const { petId } = req.params;
  
      const mascota = await Pet.findById(petId);
      if (!mascota) return res.status(404).json({ message: 'Mascota no encontrada.' });
  
      const historialClinico = await HistorialClinico.find({ petId }).sort({ fecha: -1 });
      const saludAutomatica = await HealthData.find({ petId }).sort({ timestamp: -1 }).limit(10);
      const alimentacion = await FeedingLog.find({ petId }).sort({ timestamp: -1 }).limit(10);
  
      const pathPdf = await generarPdfHistorial(mascota, {
        historialClinico,
        saludAutomatica,
        alimentacion
      });
  
      res.download(pathPdf); // Envía el archivo al navegador
    } catch (error) {
      console.error('Error al exportar historial en PDF:', error);
      res.status(500).json({ message: 'Error al generar PDF.' });
    }
  };
  
  
  
