import mongoose from 'mongoose';

const alertaSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  tipo: { type: String, required: true }, // "Ritmo", "Actividad", "Alimentación"
  mensaje: { type: String, required: true },
  valorActual: Number,
  timestamp: { type: Date, default: Date.now },
  atendida: { type: Boolean, default: false }
});

export const Alerta = mongoose.model('Alerta', alertaSchema);
