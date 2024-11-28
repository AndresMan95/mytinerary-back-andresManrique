import bcrypt from 'bcryptjs'; // Asegúrate de instalar bcryptjs
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Asegúrate de tener el modelo User

// Función para registrar un nuevo usuario
export const signUp = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 12);

        // Crear un nuevo usuario
        const newUser = new User({
            email,
            password: hashedPassword,
            name
        });

        // Guardar el usuario en la base de datos
        await newUser.save();

        // Crear un token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Función para iniciar sesión (signin)
export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Verificar la contraseña
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

        // Crear un token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

