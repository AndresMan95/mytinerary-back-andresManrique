import mongoose from 'mongoose';

const citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true },
    country: { type: String, required: true },
    continent: { type: String, required: true },
    description: { type: String, required: true },
    currency: { type: String, required: true }
});

const City = mongoose.model('City', citySchema);
export default City;
