import mongoose from 'mongoose';

const petSchema = new mongoose.Schema({
  name: String,
  species: String,
  breed: String,
  age: Date,
  weight: Number,
  chip: String,
  previousConditions: String,
  previousSurgery: String,
  diet: String,
  spayed: Boolean,
  numberOfBirths: Number
});

// ✅ Previene el OverwriteModelError:
export default mongoose.models.Pet || mongoose.model('Pet', petSchema);