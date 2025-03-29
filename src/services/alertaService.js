import { Alerta } from '../models/Alerta.js';

// Guardar alerta
export const crearAlerta = async ({ petId, tipo, mensaje, valorActual }) => {
    console.log('🚨 Disparando alerta:', { tipo, mensaje, valorActual }); // TEMPORAL para debug
  
    return await Alerta.create({
      petId,
      tipo,
      mensaje,
      valorActual
    });
  };

// Ritmo cardíaco
export const evaluarRitmoCardiaco = async (petId, heartRate) => {
    if (heartRate < 60 || heartRate > 160) {
      await crearAlerta({
        petId,
        tipo: "Ritmo",
        mensaje: `Ritmo cardíaco fuera de rango: ${heartRate} BPM`,
        valorActual: heartRate
      });
    }
  };

// Actividad física
export const evaluarActividad = async (petId, minutos, distancia) => {
  if (minutos < 15) {
    await crearAlerta({
      petId,
      tipo: "Actividad",
      mensaje: `Actividad muy baja: ${minutos} minutos`,
      valorActual: minutos
    });
  }

  if (distancia < 0.5) {
    await crearAlerta({
      petId,
      tipo: "Distancia",
      mensaje: `Distancia muy corta: ${distancia} km`,
      valorActual: distancia
    });
  }
};

// Alimentación (porcentaje respecto a lo recomendado)
export const evaluarAlimentacion = async (petId, consumoReal, consumoEsperado) => {
  const porcentaje = (consumoReal / consumoEsperado) * 100;

  if (porcentaje < 70) {
    await crearAlerta({
      petId,
      tipo: "Alimentación",
      mensaje: `Comió solo el ${porcentaje.toFixed(1)}% de lo esperado.`,
      valorActual: consumoReal
    });
  }
};
