import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // No requerido para usuarios de Google
    photoURL: { type: String },
    country: { type: String },
    googleId: { type: String }, // Para almacenar el ID de Google
}, { timestamps: true });

export default mongoose.model('User', userSchema);
