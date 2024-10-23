import express from 'express';
import { 
  createCity, 
  getAllCities, 
  getCityById, 
  loadCities 
} from '../controllers/cityController.js';

const router = express.Router();

// Cargar varias ciudades (POST)
router.post('/load', loadCities);

// Crear una ciudad (POST)
router.post('/', createCity);

// Obtener todas las ciudades (GET)
router.get('/', getAllCities);

// Obtener una ciudad específica por ID (GET)
router.get('/:id', getCityById);

export default router; // Exportar el router
