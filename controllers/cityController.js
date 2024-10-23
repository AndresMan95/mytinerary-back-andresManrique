import City from '../models/City.js'; // Asegúrate de que tienes el modelo correcto

// Cargar varias ciudades
export const loadCities = async (req, res) => {
  const citiesData = req.body; // Se espera que las ciudades vengan en el cuerpo de la solicitud
  try {
    await City.deleteMany(); // Eliminar ciudades existentes
    await City.insertMany(citiesData); // Insertar las nuevas ciudades
    res.status(201).json({ message: 'Cities loaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error loading cities', error });
  }
};

// Crear una ciudad
export const createCity = async (req, res) => {
  const cityData = req.body; // Se espera que la ciudad venga en el cuerpo de la solicitud
  try {
    const newCity = new City(cityData);
    await newCity.save();
    res.status(201).json(newCity); // Devolver la ciudad creada
  } catch (error) {
    res.status(500).json({ message: 'Error creating city', error });
  }
};

// Obtener todas las ciudades
export const getAllCities = async (req, res) => {
  try {
    const cities = await City.find(); // Obtener todas las ciudades
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cities', error });
  }
};

// Obtener una ciudad por ID
export const getCityById = async (req, res) => {
  const { id } = req.params; // Obtener el ID de los parámetros
  try {
    const city = await City.findById(id); // Buscar la ciudad por ID
    if (!city) {
      return res.status(404).json({ message: 'City not found' });
    }
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching city', error });
  }
};
