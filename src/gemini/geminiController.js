const { generarContenido } = require('geminiService.js');

module.exports.generarRespuesta = async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt requerido" });
  }

  try {
    const respuesta = await generarContenido(prompt);
    res.json({ response: respuesta });
  } catch (error) {
    console.error("Error con Gemini:", error.message);
    res.status(500).json({ error: "Error al generar respuesta con Gemini" });
  }
};
