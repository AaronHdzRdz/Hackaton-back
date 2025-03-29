import * as gpsService from '../services/gpsService.js';

// Última ubicación
export const obtenerUltimaUbicacion = async (req, res) => {
  try {
    const { petId } = req.params;
    const ubicacion = await gpsService.getLastLocation(petId);

    if (!ubicacion) {
      return res.status(404).json({ message: 'No se encontró ubicación para esta mascota.' });
    }

    res.json(ubicacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la ubicación.' });
  }
};

// Historial completo
export const obtenerHistorialUbicaciones = async (req, res) => {
  try {
    const { petId } = req.params;
    const historial = await gpsService.getLocationHistory(petId);
    res.json(historial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el historial.' });
  }
};

// Insertar ubicación simulada
export const simularUbicacion = async (req, res) => {
  try {
    const { petId, lat, lng } = req.body;

    if (!petId || lat == null || lng == null) {
      return res.status(400).json({ error: 'Faltan datos: petId, lat o lng.' });
    }

    const nuevaUbicacion = await gpsService.simulateLocation({ petId, lat, lng });

    res.status(201).json({
      message: 'Ubicación simulada guardada.',
      ubicacion: nuevaUbicacion
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar ubicación simulada.' });
  }
};
