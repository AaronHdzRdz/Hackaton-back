import { Alerta } from '../models/Alerta.js';

// Obtener todas las alertas de una mascota
export const obtenerAlertasPorMascota = async (req, res) => {
  try {
    const { petId } = req.params;

    const alertas = await Alerta.find({ petId }).sort({ timestamp: -1 });
    res.json(alertas);
  } catch (error) {
    console.error('Error al obtener alertas:', error);
    res.status(500).json({ message: 'Error al obtener alertas' });
  }
};

// Marcar una alerta como atendida
export const marcarAlertaComoAtendida = async (req, res) => {
  try {
    const { id } = req.params;

    const alerta = await Alerta.findByIdAndUpdate(
      id,
      { atendida: true },
      { new: true }
    );

    if (!alerta) {
      return res.status(404).json({ message: 'Alerta no encontrada.' });
    }

    res.json({ message: 'Alerta marcada como atendida.', alerta });
  } catch (error) {
    console.error('Error al marcar alerta como atendida:', error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Obtener solo alertas activas (no atendidas)
export const obtenerAlertasActivas = async (req, res) => {
  try {
    const { petId } = req.params;

    const alertas = await Alerta.find({
      petId,
      atendida: false
    }).sort({ timestamp: -1 });

    res.json(alertas);
  } catch (error) {
    console.error('Error al obtener alertas activas:', error);
    res.status(500).json({ message: 'Error al obtener alertas activas' });
  }
};


