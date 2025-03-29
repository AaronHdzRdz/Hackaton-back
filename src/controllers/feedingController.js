import * as feedingService from '../services/feedingService.js';
import { evaluarAlimentacion } from '../services/alertaService.js';

export const registrarFeeding = async (req, res) => {
  try {
    const data = req.body;
    const nuevo = await feedingService.crearFeeding(data);
    res.status(201).json({ message: 'Registro de alimentación guardado.', feeding: nuevo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar alimentación' });
  }
};

export const historialFeeding = async (req, res) => {
  try {
    const historial = await feedingService.obtenerHistorial(req.params.petId);
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial' });
  }
};

export const ultimaFeeding = async (req, res) => {
  try {
    const ultima = await feedingService.obtenerUltimo(req.params.petId);
    if (!ultima) return res.status(404).json({ message: 'Sin registros aún.' });
    res.json(ultima);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener último registro' });
  }
};

export const resumenFeeding = async (req, res) => {
  try {
    const resumen = await feedingService.obtenerResumenDiario(req.params.petId);

    // Validar si el resumen está vacío o no tiene datos
    if (!resumen || resumen.length === 0 || !resumen[0] || !resumen[0].promedioRecomendado) {
      return res.json({
        totalDispensado: 0,
        vecesAlimentado: 0,
        promedioRecomendado: 0
      });
    }

    const { totalDispensado, promedioRecomendado } = resumen[0];

    await evaluarAlimentacion(req.params.petId, totalDispensado, promedioRecomendado);

    res.json(resumen[0]);
  } catch (error) {
    console.error('Error en resumenFeeding:', error);
    res.status(500).json({ error: 'Error al obtener resumen diario' });
  }
};
