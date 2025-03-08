const express = require('express');
const Listing = require('../models/Listing');
const router = express.Router();

// new listing init
router.post('/create', async (req, res) => {
    try {
        const { userId, title, description, price, category, images, location } = req.body;

        if (!userId || !title || !description || !price || !category) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        const newListing = new Listing({
            userId,
            title,
            description,
            price,
            category,
            images,
            location
        });

        await newListing.save();
        res.status(201).json({ message: "Listing created successfully!", listing: newListing });

    } catch (error) {
        console.error("Error creating listing:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// all listing
router.get('/all', async (req, res) => {
    try {
        const listings = await Listing.find().populate('userId', 'username email');
        res.json(listings);
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// listing by user
router.get('/user/:userId', async (req, res) => {
    try {
        const listings = await Listing.find({ userId: req.params.userId });
        res.json(listings);
    } catch (error) {
        console.error("Error fetching user listings:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

module.exports = router;
