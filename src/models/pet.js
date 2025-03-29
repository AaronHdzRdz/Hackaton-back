import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  species: { type: String, enum: ['Perro', 'Gato'], required: true },
  breed: String,
  size: { type: String, enum: ['Pequeño', 'Mediano', 'Grande', 'Único'], required: true },
  age: Number,
  weight: Number,
  photoUrl: String,
  createdAt: { type: Date, default: Date.now }
});

export const Pet = mongoose.model('Pet', petSchema);
