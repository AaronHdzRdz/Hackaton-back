import express from 'express';
import {
  getAllPets,
  getPetById,
  createPet
} from '../controllers/petController.js';

const router = express.Router();

router.get('/', getAllPets);
router.get('/:id', getPetById);
router.post('/', createPet);

export default router;
