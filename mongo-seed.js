import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './src/models/Users.js';
import {Pet} from "./src/models/Pet.js"
import { HealthData } from './src/models/HealthData.js';
import { GPSData } from './src/models/GPSData.js';
import { FeedingLog } from './src/models/FeedingLog.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

// 1. Crear un usuario
const user = await User.create({
  name: 'Ana Torres',
  email: 'ana@example.com',
  passwordHash: 'fakehashedpassword123'
});

// 2. Crear tres mascotas (¡agregamos "size"!)
const pets = await Pet.insertMany([
  {
    userId: user._id,
    name: 'Milo',
    species: 'Gato',
    size: 'Único',
    breed: 'Maine Coon',
    age: 3,
    weight: 6.2,
    photoUrl: 'https://petcareplus.io/img/milo.png'
  },
  {
    userId: user._id,
    name: 'Luna',
    species: 'Perro',
    size: 'Grande',
    breed: 'Golden Retriever',
    age: 5,
    weight: 29.5,
    photoUrl: 'https://petcareplus.io/img/luna.png'
  },
  {
    userId: user._id,
    name: 'Simba',
    species: 'Gato',
    size: 'Único',
    breed: 'Siamés',
    age: 2,
    weight: 4.1,
    photoUrl: 'https://petcareplus.io/img/simba.png'
  }
]);

// 3. Crear datos simulados para cada mascota
for (const pet of pets) {
  await HealthData.create({
    petId: pet._id,
    heartRate: Math.floor(Math.random() * 50) + 80,
    activityMinutes: Math.floor(Math.random() * 60),
    distanceKm: parseFloat((Math.random() * 3).toFixed(2))
  });

  await GPSData.create({
    petId: pet._id,
    lat: 19.4326 + (Math.random() - 0.5) * 0.01,
    lng: -99.1332 + (Math.random() - 0.5) * 0.01
  });

  await FeedingLog.create({
    petId: pet._id,
    recommendedGrams: 100 + Math.floor(Math.random() * 50),
    actualGrams: 100 + Math.floor(Math.random() * 50),
    autoDispensed: true
  });
}

console.log('Base de datos cargada con usuario y 3 mascotas');
process.exit();
