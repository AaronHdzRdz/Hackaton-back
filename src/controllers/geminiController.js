import { generarContenido } from '../gemini/geminiService.js';  // Asegúrate de que la ruta sea correcta

export const generarRespuesta = async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Mensaje requerido' });
  }

  try {
    const respuesta = await generarContenido(message);  // Aquí estamos llamando a la función
    res.json({ response: respuesta });
  } catch (error) {
    console.error("❌ Error con Gemini:", error.message);
    res.status(500).json({ error: 'Error al generar respuesta con Gemini' });
  }
};
