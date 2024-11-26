import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js'; // Importar la función de conexión
import cityRoutes from './routes/cityRoutes.js'; // Importar las rutas de la ciudad
import ItineraryRoutes from './routes/itineraryRoutes.js'; // Importar las rutas de itinerarios
import authRoutes from './routes/authRoutes.js'; // Importar las rutas de autenticación
import cors from 'cors'; // Importar CORS
import passport from 'passport'; // Importar Passport
import './config/passportGoogle.js'; // Configuración de Passport para Google

dotenv.config(); // Cargar las variables de entorno

const app = express();
connectDB(); // Conectar a la base de datos

// Middleware
app.use(cors()); // Habilitar CORS
app.use(express.json()); // Middleware para manejar JSON
app.use(passport.initialize()); // Inicializar Passport

// Rutas
app.use('/api/cities', cityRoutes); // Rutas de ciudades
app.use('/api/itineraries', ItineraryRoutes); // Rutas de itinerarios
app.use('/api/auth', authRoutes); // Rutas de autenticación

// Puerto del servidor
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
