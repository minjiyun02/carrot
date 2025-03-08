const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    accountType: { type: String, enum: ['Personal', 'Business'], required: true },
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String },
    businessName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    country: { type: String },
    state: { type: String },
    city: { type: String },
    zipCode: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
