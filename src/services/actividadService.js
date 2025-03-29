import mongoose from 'mongoose';
import { HealthData } from '../models/HealthData.js';

export const calcularNivelActividad = async (petId) => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  const datos = await HealthData.aggregate([
    {
      $match: {
        petId: new mongoose.Types.ObjectId(petId),
        timestamp: { $gte: hoy }
      }
    },
    {
      $group: {
        _id: null,
        totalMinutos: { $sum: '$activityMinutes' },
        totalKm: { $sum: '$distanceKm' }
      }
    }
  ]);

  const { totalMinutos = 0, totalKm = 0 } = datos[0] || {};

  let nivel = 'baja';
  if (totalMinutos > 60 || totalKm > 3) nivel = 'alta';
  else if (totalMinutos >= 30 || totalKm >= 1) nivel = 'media';

  return {
    totalMinutos,
    totalKm,
    nivel
  };
};
