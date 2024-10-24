import mongoose from 'mongoose';
import "dotenv/config.js"; // Carga las variables de entorno
import '../../config/database.js'; // Importa la configuración de la base de datos
import City from '../City.js'; // Importa el modelo de Ciudad
import connectDB from '../../config/database.js';





// Conectar a la base de datos antes de intentar la inserción
const run = async () => {
    try {
        await connectDB();

        // Definir los datos a insertar
        // Datos de las ciudades
const citiesData = [
    {
        "name": "New York",
        "photo": "https://images.pexels.com/photos/771881/pexels-photo-771881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "country": "USA",
        "continent": "North America",
        "description": "The largest city in the United States.",
        "currency": "USD"
    },
    {
        "name": "Tokyo",
        "photo": "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "country": "Japan",
        "continent": "Asia",
        "description": "The bustling capital city of Japan.",
        "currency": "Yen"
    },
    {
        "name": "Paris",
        "photo": "https://images.pexels.com/photos/1530259/pexels-photo-1530259.jpeg?auto=compress&cs=tinysrgb&w=600",
        "country": "France",
        "continent": "Europe",
        "description": "The capital of France, known for its art and culture.",
        "currency": "Euro"
    },
    {
        "name": "Buenos Aires",
        "photo": "https://images.pexels.com/photos/19558951/pexels-photo-19558951/free-photo-of-ciudad-puesta-de-sol-calle-rascacielos.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "country": "Argentina",
        "continent": "South America",
        "description": "The capital of Argentina, famous for tango.",
        "currency": "Argentine Peso"
    },
    {
        "name": "Sydney",
        "photo": "https://images.unsplash.com/photo-1549180030-48bf079fb38a?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "country": "Australia",
        "continent": "Oceania",
        "description": "Australia's largest city, known for its Opera House.",
        "currency": "Australian Dollar"
    },
    {
        "name": "Cairo",
        "photo": "https://plus.unsplash.com/premium_photo-1661891622579-bee76e28c304?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2Fpcm98ZW58MHx8MHx8fDA%3D",
        "country": "Egypt",
        "continent": "Africa",
        "description": "The capital of Egypt, famous for the pyramids.",
        "currency": "Egyptian Pound"
    },
    {
        "name": "London",
        "photo": "https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "country": "United Kingdom",
        "continent": "Europe",
        "description": "The capital of the United Kingdom, known for Big Ben.",
        "currency": "Pound Sterling"
    },
    {
        "name": "Berlin",
        "photo": "https://images.pexels.com/photos/1128416/pexels-photo-1128416.jpeg?auto=compress&cs=tinysrgb&w=600",
        "country": "Germany",
        "continent": "Europe",
        "description": "Germany's capital, a city rich in history.",
        "currency": "Euro"
    },
    {
        "name": "Dubai",
        "photo": "https://images.pexels.com/photos/162031/dubai-tower-arab-khalifa-162031.jpeg?auto=compress&cs=tinysrgb&w=600",
        "country": "United Arab Emirates",
        "continent": "Asia",
        "description": "A global business hub in the Middle East.",
        "currency": "UAE Dirham"
    },
    {
        "name": "Moscow",
        "photo": "https://images.pexels.com/photos/236294/pexels-photo-236294.jpeg?auto=compress&cs=tinysrgb&w=600",
        "country": "Russia",
        "continent": "Europe",
        "description": "The capital of Russia, famous for the Kremlin.",
        "currency": "Russian Ruble"
    },
    {
        "name": "São Paulo",
        "photo": "https://images.pexels.com/photos/97906/pexels-photo-97906.jpeg?auto=compress&cs=tinysrgb&w=600",
        "country": "Brazil",
        "continent": "South America",
        "description": "The largest city in Brazil and South America.",
        "currency": "Brazilian Real"
    },
    {
        "name": "Seoul",
        "photo": "https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg?auto=compress&cs=tinysrgb&w=600",
        "country": "South Korea",
        "continent": "Asia",
        "description": "The capital of South Korea, a technology-driven city.",
        "currency": "South Korean Won"
    },
    {
        "name": "Mexico City",
        "photo": "https://images.pexels.com/photos/3551805/pexels-photo-3551805.jpeg?auto=compress&cs=tinysrgb&w=600",
        "country": "Mexico",
        "continent": "North America",
        "description": "The capital of Mexico, rich in culture and history.",
        "currency": "Mexican Peso"
    },
    {
        "name": "Cape Town",
        "photo": "https://images.pexels.com/photos/259447/pexels-photo-259447.jpeg?auto=compress&cs=tinysrgb&w=600",
        "country": "South Africa",
        "continent": "Africa",
        "description": "A coastal city known for its harbor and Table Mountain.",
        "currency": "South African Rand"
    },
    {
        "name": "Madrid",
        "photo": "https://images.pexels.com/photos/3254729/pexels-photo-3254729.jpeg?auto=compress&cs=tinysrgb&w=600",
        "country": "Spain",
        "continent": "Europe",
        "description": "The capital of Spain, famous for its royal palace and museums.",
        "currency": "Euro"
    }
];

        // Inserta los datos en la colección de ciudades
        await City.insertMany(citiesData);

        console.log('Datos insertados exitosamente');
        process.exit(); // Asegúrate de salir del proceso si estás usando un script
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

run();