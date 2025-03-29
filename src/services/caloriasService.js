import { Pet } from '../models/Pet.js';
import { Alimento } from '../models/Alimento.js';
import { RecomendacionNutricional } from '../models/RecomendacionNutricional.js';
import { calcularNivelActividad } from './actividadService.js';
import mongoose from 'mongoose';

const factoresActividad = {
  baja: 1.4,
  media: 2.0,
  alta: 3.0
};

export const calcularNecesidadesNutricionales = async (petId, alimentoSeleccionado) => {
  // 1. Buscar mascota
  const mascota = await Pet.findById(petId);
  if (!mascota) throw new Error("Mascota no encontrada.");

  const { weight, name, species, size, age } = mascota;

  // 2. Calcular actividad real del día
  const { nivel, totalKm, totalMinutos } = await calcularNivelActividad(petId);
  const factor = factoresActividad[nivel];

  // 3. Calcular necesidades calóricas
  const rer = 70 * Math.pow(weight, 0.75);
  const mer = rer * factor;

  // 4. Buscar alimento en la base de datos
  const alimentoActual = await Alimento.findOne({ nombre: alimentoSeleccionado });
  if (!alimentoActual) {
    throw new Error(`El alimento "${alimentoSeleccionado}" no existe en la base de datos.`);
  }

  const caloriasAlimento = alimentoActual.kcalPor100g;
  const gramos = (mer / (caloriasAlimento / 100)).toFixed(0);

  // 5. Buscar mejor alternativa
  const todosLosAlimentos = await Alimento.find({});
  let mejorOpcion = alimentoActual.nombre;
  let menorDiferencia = Infinity;

for (const alimento of todosLosAlimentos) {
  console.log("Alimento actual:", alimentoActual.nombre);
  console.log("Mejor opción calculada:", mejorOpcion);
  const kcalAlternativa = alimento.kcalPor100g;
  const gramosNecesarios = mer / (kcalAlternativa / 100);
  const kcalCalculadas = gramosNecesarios * (kcalAlternativa / 100);

  const diferencia = Math.abs(kcalCalculadas - mer);

  if (diferencia < menorDiferencia) {
    menorDiferencia = diferencia;
    mejorOpcion = alimento.nombre;
  }
}

  // 6. Guardar en la colección de recomendaciones
  await RecomendacionNutricional.create({
    petId: new mongoose.Types.ObjectId(petId),
    caloriasNecesarias: mer,
    gramosSugeridos: gramos,
    actividadNivel: nivel,
    alimentoActual: alimentoActual.nombre,
    recomendacion: mejorOpcion !== alimentoActual.nombre ? mejorOpcion : null
  });

  // 7. Retornar el resultado al cliente
  return {
    mascota: name,
    especie: species,
    tamaño: size,
    age,
    pesoKg: weight,
    caloriasNecesarias: mer.toFixed(2),
    gramosSugeridos: gramos,
    actividad: nivel,
    actividadReal: {
      minutos: totalMinutos,
      distancia: totalKm
    },
    alimento: alimentoActual.nombre,
    recomendacion: mejorOpcion !== alimentoActual.nombre ? mejorOpcion : null
  };
};
