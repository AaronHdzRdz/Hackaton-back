import { GPSData } from '../models/GPSData.js';

export const getLastLocation = async (petId) => {
  return await GPSData.findOne({ petId }).sort({ timestamp: -1 });
};

export const getLocationHistory = async (petId) => {
  return await GPSData.find({ petId }).sort({ timestamp: -1 });
};

export const simulateLocation = async ({ petId, lat, lng }) => {
  const location = new GPSData({ petId, lat, lng });
  return await location.save();
};
