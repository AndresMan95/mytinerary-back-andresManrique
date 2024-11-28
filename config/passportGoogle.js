import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

// Usar las variables de entorno
const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.GOOGLE_CALLBACK_URL;

console.log(clientID, clientSecret, callbackURL); // Solo para pruebas, elimina en producción

passport.use(
    new GoogleStrategy(
        {
            clientID,
            clientSecret,
            callbackURL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Verifica si el usuario ya existe por email en la base de datos
                let user = await User.findOne({ email: profile.emails[0].value });

                if (!user) {
                    // Si no existe, crea un nuevo usuario
                    user = new User({
                        googleId: profile.id,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: profile.emails[0].value,
                        photoURL: profile.photos[0].value,
                    });

                    await user.save(); // Guarda el nuevo usuario en la base de datos
                }

                // Devolver el usuario
                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
