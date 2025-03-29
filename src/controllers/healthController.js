// Visualización del estado
import { HealthData } from '../models/HealthData.js';
import {
  evaluarPulso,
  evaluarActividad as evaluarActividadVisual,
  evaluarDistancia
} from '../utils/evaluarSalud.js';
import Pet from '../models/pet.js';

// Lógica de alertas
import {
  evaluarRitmoCardiaco,
  evaluarActividad as evaluarActividadAlerta // 👈 este es el importante
} from '../services/alertaService.js';

// Ruta usada por el hardware para guardar nuevos datos
export const createHealthData = async (req, res) => {
  try {
    const { petId, heartRate, activityMinutes, distanceKm } = req.body;

    const data = await HealthData.create({
      petId,
      heartRate,
      activityMinutes,
      distanceKm
    });

    await evaluarRitmoCardiaco(petId, heartRate);
    await evaluarActividadAlerta(petId, activityMinutes, distanceKm);

    res.status(201).json({ message: 'Datos de salud guardados correctamente.', data });
  } catch (err) {
    console.error('Error al guardar datos de salud:', err);
    res.status(500).json({ message: 'Error interno al guardar datos.' });
  }
};

// Ruta usada por el frontend para analizar el estado de salud actual
export const getHealthStatus = async (req, res) => {
  try {
    const { petId } = req.params;

    const pet = await Pet.findById(petId);
    if (!pet) return res.status(404).json({ message: 'Mascota no encontrada' });

    const ultimo = await HealthData.findOne({ petId }).sort({ timestamp: -1 });
    if (!ultimo) return res.status(404).json({ message: 'Sin datos de salud para esta mascota' });

    const heartRateEstado = evaluarPulso(pet, ultimo.heartRate);
    const actividadEstado = evaluarActividadVisual(pet, ultimo.activityMinutes);
    const distanciaEstado = evaluarDistancia(pet, ultimo.distanceKm);

    // Calcular estado general
    const estados = [heartRateEstado, actividadEstado, distanciaEstado];
    let estadoGeneral = 'Normal';
    if (estados.includes('Peligro')) estadoGeneral = 'Peligro';
    else if (estados.includes('Advertencia')) estadoGeneral = 'Advertencia';

    res.json({
      petId,
      heartRate: { value: ultimo.heartRate, estado: heartRateEstado },
      activity: { value: ultimo.activityMinutes, estado: actividadEstado },
      distance: { value: ultimo.distanceKm, estado: distanciaEstado },
      estadoGeneral
    });
  } catch (err) {
    console.error('Error al evaluar estado:', err);
    res.status(500).json({ message: 'Error al obtener el estado de salud' });
  }
};

