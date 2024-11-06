import Itinerary from '../models/Itinerary.js';
import City from '../models/City.js';
import mongoose from 'mongoose';
// Crear un itinerario
export const createItinerary = async (req, res) => {
    try {
        const { author, price, duration, likes, hashtags, photo, city_id } = req.body;

        // Buscar la ciudad
        const city = await City.findById(city_id);
        if (!city) {
            return res.status(404).json({ message: "Ciudad no encontrada" });
        }

        // Crear el nuevo itinerario
        const newItinerary = new Itinerary({
            author, price, duration, likes, hashtags, photo, city: city_id
        });

        // Guardar el itinerario
        const savedItinerary = await newItinerary.save();

        res.status(201).json(savedItinerary);
    } catch (err) {
        console.log("Error al crear el itinerario:", err);
        res.status(500).json({ message: "Error al crear el itinerario", error: err });
    }
};

// Obtener itinerarios de una ciudad
export const getItinerariesByCity = async (req, res) => {
    try {
        const { city_id } = req.params;
        
        // Obtener todos los itinerarios que tienen la ciudad correspondiente
        const itineraries = await Itinerary.find({ city: city_id });
        
        if (!itineraries || itineraries.length === 0) {
            return res.status(404).json({ message: 'No hay itinerarios para esta ciudad' });
        }

        res.status(200).json(itineraries);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener itinerarios", error: err });
    }
};

// Actualizar un itinerario
export const updateItinerary = async (req, res) => {
    try {
        const { itinerary_id } = req.params;
        const updatedItinerary = await Itinerary.findByIdAndUpdate(itinerary_id, req.body, { new: true });
        
        if (!updatedItinerary) {
            return res.status(404).json({ message: 'Itinerario no encontrado' });
        }

        res.status(200).json(updatedItinerary);
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar el itinerario", error: err });
    }
};

// Eliminar un itinerario
export const deleteItinerary = async (req, res) => {
    try {
        const { itinerary_id } = req.params;

        // Eliminar el itinerario de la base de datos
        const deletedItinerary = await Itinerary.findByIdAndDelete(itinerary_id);
        
        if (!deletedItinerary) {
            return res.status(404).json({ message: "Itinerario no encontrado" });
        }

        res.status(200).json({ message: 'Itinerario eliminado exitosamente' });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar el itinerario", error: err });
    }
};

// Crear varios itinerarios
export const createMultipleItineraries = async (req, res) => {
    try {
        const itinerariesData = req.body;
        console.log("Datos recibidos:", itinerariesData);  // Esto ayudará a ver qué datos se reciben

        // Verificar que los datos sean correctos
        if (!Array.isArray(itinerariesData) || itinerariesData.length === 0) {
            return res.status(400).json({ message: "Debe proporcionar un arreglo de itinerarios" });
        }

        const savedItineraries = [];
        for (const data of itinerariesData) {
            const { city_id, itineraries } = data;
            console.log("city_id:", city_id);  // Verifica que city_id es lo que esperas

            // Verificar si city_id es un ObjectId válido
            if (!mongoose.Types.ObjectId.isValid(city_id)) {
                return res.status(400).json({ message: `ID de ciudad ${city_id} no es válido` });
            }

            // Buscar la ciudad por su ID
            const city = await City.findById(city_id);
            if (!city) {
                return res.status(404).json({ message: `Ciudad con ID ${city_id} no encontrada` });
            }

            // Crear y guardar los itinerarios para esa ciudad
            for (const itineraryData of itineraries) {
                const { author, price, duration, likes, hashtags, photo } = itineraryData;

                const newItinerary = new Itinerary({
                    author,
                    price,
                    duration,
                    likes,
                    hashtags,
                    photo,
                    city: city_id // Asociar el itinerario con la ciudad
                });

                const savedItinerary = await newItinerary.save();
                savedItineraries.push(savedItinerary);
            }
        }

        // Responder con los itinerarios guardados
        res.status(201).json(savedItineraries);
    } catch (err) {
        console.log("Error al crear los itinerarios:", err);
        res.status(500).json({ message: "Error al crear los itinerarios", error: err });
    }
};
