export function evaluarPulso(pet, heartRate) {
    const rangos = {
      Gato: { min: 140, max: 220 },
      Perro: { min: 60, max: 140 }
    };
  
    const especie = pet.species;
    const { min, max } = rangos[especie] || {};
  
    if (!min || !max) return 'Desconocido';
  
    return heartRate < min || heartRate > max ? 'Peligro' : 'Normal';
}
  
  export function evaluarActividad(pet, activityMinutes) {
    const niveles = {
      Perro: {
        Pequeño: [{ edad: 0, min: 20 }, { edad: 5, min: 15 }, { edad: 10, min: 10 }],
        Mediano: [{ edad: 0, min: 30 }, { edad: 5, min: 20 }, { edad: 10, min: 10 }],
        Grande: [{ edad: 0, min: 40 }, { edad: 5, min: 25 }, { edad: 10, min: 15 }]
      },
      Gato: {
        Único: [{ edad: 0, min: 15 }, { edad: 5, min: 10 }, { edad: 10, min: 5 }]
      }
    };
  
    const especie = pet.species;
    const size = pet.size || 'Único';
    const edad = pet.age;
  
    const reglas = niveles[especie]?.[size];
    if (!reglas) return 'Desconocido';
  
    let regla = reglas[reglas.length - 1];
    for (const r of reglas) {
      if (edad <= r.edad) {
        regla = r;
        break;
      }
    }
  
    return activityMinutes < regla.min ? 'Advertencia' : 'Normal';
  }
  
export function evaluarDistancia(pet, distanceKm) {
    if (pet.species === 'Perro') {
      return distanceKm < 0.5 ? 'Advertencia' : 'Normal';
    }
    if (pet.species === 'Gato') {
      return distanceKm < 0.3 ? 'Advertencia' : 'Normal';
    }
    return 'Desconocido';
  }
  