import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import healthRoutes from './src/routes/health.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Usar las rutas de salud
app.use('/api/health', healthRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`)))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));
