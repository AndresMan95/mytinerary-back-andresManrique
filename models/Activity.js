const activitySchema = new mongoose.Schema({
    itinerary: { type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' },
    title: { type: String, required: true },
    description: { type: String },
    photo: { type: String }
});

module.exports = mongoose.model('Activity', activitySchema);
