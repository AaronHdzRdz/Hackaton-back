import mongoose from 'mongoose';

const recomendacionSchema = new mongoose.Schema({
    petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet' },
    timestamp: { type: Date, default: Date.now },
    caloriasNecesarias: Number,
    gramosSugeridos: Number,
    actividadNivel: String,
    alimentoActual: String,
    recomendacion: String
  });
  
  export const RecomendacionNutricional = mongoose.model('RecomendacionNutricional', recomendacionSchema);
  