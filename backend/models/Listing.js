const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{ type: String }],
    location: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Listing', ListingSchema);
