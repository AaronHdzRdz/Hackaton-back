import mongoose from 'mongoose';

const historialClinicoSchema = new mongoose.Schema({
petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  fecha: { type: Date, default: Date.now },
  temperatura: Number,
  frecuenciaRespiratoria: Number,
  observaciones: String,
  diagnostico: String,
  tratamiento: String,
  creadoPor: String // nombre del veterinario o "app" si es automático
});

export const HistorialClinico = mongoose.model('HistorialClinico', historialClinicoSchema);
