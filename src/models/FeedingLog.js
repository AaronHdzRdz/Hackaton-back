import mongoose from 'mongoose';

const feedingLogSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  timestamp: { type: Date, default: Date.now },
  recommendedGrams: Number,
  actualGrams: Number,
  autoDispensed: Boolean
});

export const FeedingLog = mongoose.model('FeedingLog', feedingLogSchema);