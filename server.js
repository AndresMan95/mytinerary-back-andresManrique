import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js'; // Importar la función de conexión
import cityRoutes from './routes/cityRoutes.js'; // Importar las rutas de la ciudad
import cors from 'cors'; // Importar CORS

dotenv.config(); // Cargar las variables de entorno

const app = express();
connectDB(); // Conectar a la base de datos
app.use(cors()); // Habilitar CORS
app.use(express.json());
app.use('/api/cities', cityRoutes); // Definir las rutas


const PORT = process.env.PORT || 8080; // Puerto del servidor

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
