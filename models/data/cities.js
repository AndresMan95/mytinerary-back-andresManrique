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
        "photo": "https://upload.wikimedia.org/wikipedia/commons/c/c7/Times_Square_%28163475808%29.jpeg",
        "country": "USA",
        "continent": "North America",
        "description": "The largest city in the United States.",
        "currency": "USD"
    },
    {
        "name": "Tokyo",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/f/fd/Tokyo_Skyline_from_Tokyo_Tower_2013.jpg",
        "country": "Japan",
        "continent": "Asia",
        "description": "The bustling capital city of Japan.",
        "currency": "Yen"
    },
    {
        "name": "Paris",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
        "country": "France",
        "continent": "Europe",
        "description": "The capital of France, known for its art and culture.",
        "currency": "Euro"
    },
    {
        "name": "Buenos Aires",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/3/3b/Plaza_de_Mayo_-_Buenos_Aires_-_Argentina.jpg",
        "country": "Argentina",
        "continent": "South America",
        "description": "The capital of Argentina, famous for tango.",
        "currency": "Argentine Peso"
    },
    {
        "name": "Sydney",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/5/5e/Sydney_Opera_House_-_Dec_2008.jpg",
        "country": "Australia",
        "continent": "Oceania",
        "description": "Australia's largest city, known for its Opera House.",
        "currency": "Australian Dollar"
    },
    {
        "name": "Cairo",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/3/3d/Cairo_city_view_from_Cairo_Tower_-_Feb_2007.jpg",
        "country": "Egypt",
        "continent": "Africa",
        "description": "The capital of Egypt, famous for the pyramids.",
        "currency": "Egyptian Pound"
    },
    {
        "name": "London",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/5/55/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg",
        "country": "United Kingdom",
        "continent": "Europe",
        "description": "The capital of the United Kingdom, known for Big Ben.",
        "currency": "Pound Sterling"
    },
    {
        "name": "Berlin",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/0/02/Berlin_Gendarmenmarkt_Panorama.jpg",
        "country": "Germany",
        "continent": "Europe",
        "description": "Germany's capital, a city rich in history.",
        "currency": "Euro"
    },
    {
        "name": "Dubai",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/6/6d/Dubai_Marina_in_the_morning.jpg",
        "country": "United Arab Emirates",
        "continent": "Asia",
        "description": "A global business hub in the Middle East.",
        "currency": "UAE Dirham"
    },
    {
        "name": "Moscow",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/3/37/Moscow_June_2016-7a.jpg",
        "country": "Russia",
        "continent": "Europe",
        "description": "The capital of Russia, famous for the Kremlin.",
        "currency": "Russian Ruble"
    },
    {
        "name": "São Paulo",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/3/3b/S%C3%A3o_Paulo_City_by_Night.jpg",
        "country": "Brazil",
        "continent": "South America",
        "description": "The largest city in Brazil and South America.",
        "currency": "Brazilian Real"
    },
    {
        "name": "Seoul",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/7/7c/Seoul_Skyline.jpg",
        "country": "South Korea",
        "continent": "Asia",
        "description": "The capital of South Korea, a technology-driven city.",
        "currency": "South Korean Won"
    },
    {
        "name": "Mexico City",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/f/f7/Ciudad_de_M%C3%A9xico_DF.JPG",
        "country": "Mexico",
        "continent": "North America",
        "description": "The capital of Mexico, rich in culture and history.",
        "currency": "Mexican Peso"
    },
    {
        "name": "Cape Town",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/c/cb/Cape_Town_Skyline.jpg",
        "country": "South Africa",
        "continent": "Africa",
        "description": "A coastal city known for its harbor and Table Mountain.",
        "currency": "South African Rand"
    },
    {
        "name": "Madrid",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Plaza_Mayor_de_Madrid_06.jpg",
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