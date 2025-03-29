import { FeedingLog } from '../models/FeedingLog.js';
import mongoose from 'mongoose';


export const crearFeeding = async (data) => {
  const log = new FeedingLog(data);
  return await log.save();
};

export const obtenerHistorial = async (petId) => {
  return await FeedingLog.find({ petId }).sort({ timestamp: -1 });
};

export const obtenerUltimo = async (petId) => {
  return await FeedxingLog.findOne({ petId }).sort({ timestamp: -1 });
};

export const obtenerResumenDiario = async (petId) => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  return await FeedingLog.aggregate([
    {
      $match: {
        petId: new mongoose.Types.ObjectId(petId),
        timestamp: { $gte: hoy }
      }
    },
    {
      $group: {
        _id: null,
        totalDispensado: { $sum: "$actualGrams" },
        vecesAlimentado: { $sum: 1 },
        promedioRecomendado: { $avg: "$recommendedGrams" }
      }
    }
  ]);
};
