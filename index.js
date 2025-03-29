import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import petRoutes from './src/routes/pets.js';
import healthRoutes from './src/routes/health.js';
import gpsRoutes from "./src/routes/gps.js"
import feedingRoutes from './src/routes/feeding.js'
import nutricionRoutes from './src/routes/nutricion.js'
import alimentoRoutes from './src/routes/alimentos.js';
import alertasRoutes from './src/routes/alertas.js';
import historialRoutes from './src/routes/historial.js';
import geminiRoutes from './src/gemini/gemini.js';


dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000', // frontend local
  credentials: true // si necesitas enviar cookies
}));
app.use(express.json());

// Usar las rutas de salud
app.use('/api/health', healthRoutes);
app.use('/api/gps',gpsRoutes)
app.use('/api/feeding',feedingRoutes)
app.use('/api/nutricion', nutricionRoutes);
app.use('/api/alimentos', alimentoRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/alertas', alertasRoutes);
app.use('/api/gemini', geminiRoutes); 
app.use('/api/pets', petRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Conectado a MongoDB');
}).catch(err => {
  console.error('❌ Error al conectar a MongoDB:', err);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
})
