import mongoose from 'mongoose';

const gpsDataSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  timestamp: { type: Date, default: Date.now },
  lat: Number,
  lng: Number
});

export const GPSData = mongoose.model('GPSData', gpsDataSchema);
