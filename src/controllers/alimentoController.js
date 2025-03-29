import { Alimento } from '../models/Alimento.js';

// Registrar alimento
export const registrarAlimento = async (req, res) => {
  try {
    const { nombre, kcalPor100g } = req.body;
    const nuevo = await Alimento.create({ nombre, kcalPor100g });
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar alimento.' });
  }
};

// Obtener todos los alimentos
export const listarAlimentos = async (req, res) => {
  try {
    const alimentos = await Alimento.find().sort({ nombre: 1 });
    res.json(alimentos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener alimentos.' });
  }
};
