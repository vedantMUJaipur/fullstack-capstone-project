const express = require('express');
const router = express.Router();
const connectToDatabase = require('../models/db');
const logger = require('../logger');

// Endpoint to find the current user profile using findOne
router.get('/user', async (req, res) => {
    try {
        const email = req.headers.email;
        if (!email) {
            return res.status(400).json({ error: "Email header is missing" });
        }

        const db = await connectToDatabase();
        const collection = db.collection("users");

        // Using findOne to locate the current user in the database
        const user = await collection.findOne({ email: email });

        if (!user) {
            logger.error(`User with email ${email} not found`);
            return res.status(404).json({ error: "User not found" });
        }

        const { password, ...userProfile } = user;
        res.json(userProfile);
    } catch (e) {
        logger.error(`Error locating user: ${e.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
