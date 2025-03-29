import mongoose from 'mongoose';

const alimentoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true },
  kcalPor100g: { type: Number, required: true }
});

export const Alimento = mongoose.model('Alimento', alimentoSchema);
