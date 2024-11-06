import mongoose from 'mongoose';
const { Schema } = mongoose;

const itinerarySchema = new Schema({
    author: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    likes: { type: Number, required: true },
    hashtags: { type: [String], required: true },
    photo: { type: String, required: true },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'cities', required: true } // Referencia a la ciudad
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);
export default Itinerary;
