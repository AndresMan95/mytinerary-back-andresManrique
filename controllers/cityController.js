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

// Eliminar ciudades sin imagen o con URLs no válidas
export const deleteCitiesWithoutImages = async (req, res) => {
  try {
    const result = await City.deleteMany({
      $or: [
        { photo: { $exists: false } },   // Ciudades sin campo 'photo'
        { photo: '' },                   // Ciudades con 'photo' vacío
        { photo: { $regex: /^(?!http)/ } } // Ciudades con URLs no válidas (no comienzan con http)
      ]
    });
    res.status(200).json({ message: 'Ciudades eliminadas', deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar ciudades', error });
  }
};

export const deleteCitiesWithInvalidPhotos = async (req, res) => {
  try {
    // Aquí puedes agregar todas las URLs de imágenes que sabes que están rotas
    const invalidPhotoUrls = [
      "https://upload.wikimedia.org/wikipedia/commons/c/c7/Times_Square_%28163475808%29.jpeg",
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/Tokyo_Skyline_from_Tokyo_Tower_2013.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/Plaza_de_Mayo_-_Buenos_Aires_-_Argentina.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/5/5e/Sydney_Opera_House_-_Dec_2008.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/3d/Cairo_city_view_from_Cairo_Tower_-_Feb_2007.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/5/55/Palace_of_Westminster_from_the_dome_on_Methodist_Central_Hall.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/0/02/Berlin_Gendarmenmarkt_Panorama.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/6/6d/Dubai_Marina_in_the_morning.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/37/Moscow_June_2016-7a.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/3/3b/S%C3%A3o_Paulo_City_by_Night.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/7/7c/Seoul_Skyline.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/f/f7/Ciudad_de_M%C3%A9xico_DF.JPG",
      "https://upload.wikimedia.org/wikipedia/commons/c/cb/Cape_Town_Skyline.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/a/a5/Plaza_Mayor_de_Madrid_06.jpg",
      // Agrega más URLs según sea necesario
    ];

    // Eliminar todas las ciudades con una URL de imagen no válida
    const result = await City.deleteMany({ photo: { $in: invalidPhotoUrls } });

    res.status(200).json({ message: 'Ciudades eliminadas', deletedCount: result.deletedCount });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar ciudades', error });
  }
};
