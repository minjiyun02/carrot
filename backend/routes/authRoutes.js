const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

router.use(express.json());

// Register User
router.post('/signup', async (req, res) => {
    console.log("Received Data:", req.body);

    try {
        if (!req.body.accountType) {
            return res.status(400).json({ message: "Account type is required" });
        }

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ message: 'Email already exists' });

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            accountType: req.body.accountType,
            firstName: req.body.accountType === 'Personal' ? req.body.firstName : undefined,
            lastName: req.body.accountType === 'Personal' ? req.body.lastName : undefined,
            username: req.body.accountType === 'Personal' ? req.body.username : undefined,
            businessName: req.body.accountType === 'Business' ? req.body.businessName : undefined,
            email: req.body.email,
            password: hashedPassword,
            country: req.body.accountType === 'Personal' ? req.body.country : undefined,
            state: req.body.state,
            city: req.body.accountType === 'Personal' ? req.body.city : undefined,
            zipCode: req.body.accountType === 'Personal' ? req.body.zipCode : undefined
        });

        console.log("Saving user:", newUser);
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error("Error in Signup:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, userId: user._id, name: user.firstName || user.businessName });
    } catch (error) {
        console.error("Error in Signin:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
