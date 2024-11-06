import express from 'express';
import { createItinerary, getItinerariesByCity, updateItinerary, deleteItinerary, createMultipleItineraries } from '../controllers/itineraryController.js';

const router = express.Router();

// Crear un itinerario
router.post('/create', createItinerary);

// Crear múltiples itinerarios
router.post('/createMultiple', createMultipleItineraries); // Nueva ruta para agregar múltiples itinerarios

// Obtener itinerarios de una ciudad
router.get('/:city_id', getItinerariesByCity);  // Actualizado para reflejar la ruta correcta

// Actualizar itinerario
router.put('/:itinerary_id/update', updateItinerary);

// Eliminar itinerario
router.delete('/:itinerary_id/delete/:city_id', deleteItinerary);

export default router;
