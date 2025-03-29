import { calcularNecesidadesNutricionales } from '../services/caloriasService.js';

export const obtenerRecomendacionNutricional = async (req, res) => {
  try {
    const { petId } = req.params;
    const { alimento } = req.query;

    if (!alimento) {
      return res.status(400).json({ error: 'Falta el nombre del alimento en la query.' });
    }

    const resultado = await calcularNecesidadesNutricionales(petId, alimento);
    res.json(resultado);
  } catch (error) {
    console.error('Error nutricional:', error);
    res.status(500).json({ error: 'No se pudo calcular la recomendación nutricional.' });
  }
};
