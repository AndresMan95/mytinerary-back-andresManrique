import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Ruta para iniciar sesión con Google
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'], // Solicitar acceso a perfil y correo
  })
);

// Ruta de callback de Google
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // Generar el token JWT
    const payload = {
      id: req.user.id, // ID del usuario desde la base de datos
      name: req.user.name, // Nombre del usuario
      email: req.user.email, // Correo del usuario
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token válido por 1 hora
    });

    // Enviar el token al frontend
    res.status(200).json({ message: 'Login successful', token });
  }
);

// Ruta para logout (opcional)
router.get('/logout', (req, res) => {
  res.status(200).json({ message: 'Logout successful' });
});

export default router;
