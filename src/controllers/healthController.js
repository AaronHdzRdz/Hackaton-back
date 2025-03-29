<<<<<<< Updated upstream
import { HealthData } from '../models/HealthData.js';
import Pet from '../models/Pet.js';
 // Asegúrate de importar correctamente el modelo Pet
=======
import { HealthData } from '../models/HealthData.js';  // Asegúrate de importar correctamente el modelo Pet
>>>>>>> Stashed changes
import {
  evaluarPulso,
  evaluarActividad as evaluarActividadVisual,
  evaluarDistancia
} from '../utils/evaluarSalud.js';


// Lógica de alertas
import {
  evaluarRitmoCardiaco,
  evaluarActividad as evaluarActividadAlerta // 👈 este es el importante
} from '../services/alertaService.js';

// Ruta usada por el hardware para guardar nuevos datos
export const createHealthData = async (req, res) => {
  try {
    const { petId, heartRate, activityMinutes, distanceKm } = req.body;

    // Crear los datos de salud para la mascota
    const data = await HealthData.create({
      petId,
      heartRate,
      activityMinutes,
      distanceKm
    });

    // Llamamos a los servicios de alerta y evaluación
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
    const { petId } = req.params;  // Obtenemos el petId desde la ruta

    // Buscar la mascota con el petId proporcionado
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

    // Buscar los últimos datos de salud de la mascota
    const ultimo = await HealthData.findOne({ petId }).sort({ timestamp: -1 });
    if (!ultimo) {
      return res.status(404).json({ message: 'Sin datos de salud para esta mascota' });
    }

    // Evaluar el estado del pulso, actividad y distancia
    const heartRateEstado = evaluarPulso(pet, ultimo.heartRate);
    const actividadEstado = evaluarActividadVisual(pet, ultimo.activityMinutes);
    const distanciaEstado = evaluarDistancia(pet, ultimo.distanceKm);

    // Calcular el estado general de la mascota
    const estados = [heartRateEstado, actividadEstado, distanciaEstado];
    let estadoGeneral = 'Normal';
    if (estados.includes('Peligro')) estadoGeneral = 'Peligro';
    else if (estados.includes('Advertencia')) estadoGeneral = 'Advertencia';

    // Enviar la respuesta con el estado de salud de la mascota
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
