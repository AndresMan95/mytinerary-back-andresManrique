import express from 'express';
import { 
  createCity, 
  getAllCities, 
  getCityById, 
  loadCities,
  deleteCitiesWithoutImages,
  deleteCitiesWithInvalidPhotos
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

// Nueva ruta para eliminar ciudades con imágenes no válidas (DELETE)
router.delete('/remove-invalid', deleteCitiesWithoutImages);

// Definir la ruta para eliminar ciudades con imágenes inválidas
router.delete('/delete-invalid-photos', deleteCitiesWithInvalidPhotos);


export default router; // Exportar el router
