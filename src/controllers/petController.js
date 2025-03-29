import Pet from '../models/pet.js'; // ✅ correcto


// Obtener todas las mascotas
export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener mascotas' });
  }
};

// Obtener una sola mascota
export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Mascota no encontrada' });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener mascota' });
  }
};

// Crear nueva mascota
export const createPet = async (req, res) => {
  try {
    const pet = await Pet.create(req.body);
    res.status(201).json(pet);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear mascota' });
  }
};
