import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { signUp, signIn } from '../controllers/authController.js'; // Asegúrate de tener los controladores importados
import { verifyToken } from '../middelwares/authMiddleware.js'; // Importa verifyToken
import User from '../models/User.js'; // Asegúrate de tener el modelo User importado

const router = express.Router();

// Define la función getUser antes de usarla
export const getUser = async (req, res) => {
    try {
        const userId = req.user.id; // El id del usuario proviene del token
        const user = await User.findById(userId); // Buscamos al usuario en la base de datos

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User data retrieved successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Ruta para registrar un nuevo usuario
router.post('/signup', signUp);

// Ruta para iniciar sesión con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Ruta de callback de Google
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const payload = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  }
);

// Ruta para iniciar sesión con email y contraseña
router.post('/signin', signIn);

// Ruta de logout (opcional)
router.get('/logout', (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

// Ruta para obtener los datos del usuario (requiere verificación de token)
router.get('/user', verifyToken, getUser); // Usamos verifyToken para proteger la ruta

export default router;
