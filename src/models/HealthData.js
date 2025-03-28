import mongoose from 'mongoose';

const healthDataSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  timestamp: { type: Date, default: Date.now },
  heartRate: Number,
  activityMinutes: Number,
  distanceKm: Number
});

export const HealthData = mongoose.model('HealthData', healthDataSchema);
