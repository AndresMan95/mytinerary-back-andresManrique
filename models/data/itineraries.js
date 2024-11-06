import mongoose from 'mongoose';
import City from '../../models/City.js'  // Asegúrate de que la ruta sea correcta
import Itinerary from '../../models/Itinerary.js';  // Asegúrate de que la ruta sea correcta
import connectDB from '../../config/database.js';

// Datos de itinerarios en formato JSON (lo que me diste)
const run = async () => {
  try {
    await connectDB();
    const data = [
      {
        "city_id": "672a8ee485e3b5e03f496d3e",
        "city_name": "New York",
        "itineraries": [
          {
            "author": "John Doe",
            "price": 4,
            "duration": 5,
            "likes": 26,
            "hashtags": ["#NewYork", "#Travel", "#CityLife"],
            "photo": "https://robohash.org/JohnDoe"
          },
          {
            "author": "Jane Smith",
            "price": 5,
            "duration": 3,
            "likes": 54,
            "hashtags": ["#NewYork", "#Food", "#Culture"],
            "photo": "https://robohash.org/JanethSmith"
          },
          {
            "author": "Alice Johnson",
            "price": 3,
            "duration": 4,
            "likes": 45,
            "hashtags": ["#NewYork", "#History", "#Art"],
            "photo": "https://robohash.org/AliceJohnson"
          }
        ]
      },
      {
        "city_id": "672a8ee485e3b5e03f496d3f",
        "city_name": "Tokyo",
        "itineraries": [
          {
            "author": "Koji Tanaka",
            "price": 5,
            "duration": 6,
            "likes": 22,
            "hashtags": ["#Tokyo", "#Adventure", "#Foodie"],
            "photo": "https://robohash.org/KojiTanaka"
          },
          {
            "author": "Sakura Yamamoto",
            "price": 2,
            "duration": 2,
            "likes": 5,
            "hashtags": ["#Tokyo", "#Nightlife", "#Cityscape"],
            "photo": "https://robohash.org/SakaruYamamoto"
          }
        ]
      },
      {
        "city_id": "672a8ee485e3b5e03f496d40",
        "city_name": "Paris",
        "itineraries": []
      },
      {
        "city_id": "672a8ee485e3b5e03f496d41",
        "city_name": "Buenos Aires",
        "itineraries": [
          {
            "author": "Carlos Pérez",
            "price": 4,
            "duration": 3,
            "likes": 0,
            "hashtags": ["#BuenosAires", "#Tango", "#Culture"],
            "photo": "https://robohash.org/CarlosLopez"
          },
          {
            "author": "María López",
            "price": 3,
            "duration": 5,
            "likes": 0,
            "hashtags": ["#BuenosAires", "#Food", "#History"],
            "photo": "https://robohash.org/MariaLopez"
          }
        ]
      },
      {
        "city_id": "672a8ee485e3b5e03f496d42",
        "city_name": "Sydney",
        "itineraries": [
          {
            "author": "John Smith",
            "price": 5,
            "duration": 4,
            "likes": 0,
            "hashtags": ["#Sydney", "#Beaches", "#Nature"],
            "photo": "https://robohash.org/JohnSmith"
          },
          {
            "author": "Mary Johnson",
            "price": 2,
            "duration": 2,
            "likes": 0,
            "hashtags": ["#Sydney", "#Culture", "#Art"],
            "photo": "https://robohash.org/MaryJohnson"
          },
          {
            "author": "David Brown",
            "price": 4,
            "duration": 3,
            "likes": 0,
            "hashtags": ["#Sydney", "#Food", "#Travel"],
            "photo": "https://robohash.org/DavidBrown"
          }
        ]
      }
    ];


    // Borrar todos los datos actuales
    await City.deleteMany({});
    await Itinerary.deleteMany({});

    // Insertar los itinerarios y asociarlos a las ciudades
    for (const cityData of data) {
      // Primero insertamos los itinerarios
      const itineraries = await Itinerary.insertMany(
        cityData.itineraries.map(itinerary => ({
          ...itinerary,
          city: cityData.city_id  // Asociamos el itinerario con la ciudad correspondiente
        }))
      );

      // Ahora insertamos la ciudad y asociamos los itinerarios
      const city = new City({
        city_id: cityData.city_id,
        city_name: cityData.city_name,
        itineraries: itineraries.map(itinerary => itinerary._id)  // Guardamos los _id de los itinerarios
      });

      // Guardamos la ciudad
      await city.save();
    }

    console.log('¡Datos insertados correctamente!');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error al insertar los datos:', err);
    mongoose.connection.close();
  }
}

// Ejecutar la función para insertar los datos
run();
