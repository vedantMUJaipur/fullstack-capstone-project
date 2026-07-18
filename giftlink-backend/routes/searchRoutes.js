const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db');

// Task 6 Route: Filter items by category/name/condition
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        
        let query = {};
        
        // Filter by name if query string exists
        if (req.query.name) {
            query.name = { $regex: req.query.name, $options: "i" };
        }
        
        // Filter by category if query string exists
        if (req.query.category) {
            query.category = req.query.category;
        }
        
        // Filter by condition if query string exists
        if (req.query.condition) {
            query.condition = req.query.condition;
        }

        const gifts = await collection.find(query).toArray();
        res.status(200).json(gifts);
    } catch (e) {
        res.status(500).send("Search query failed: " + e.message);
    }
});

module.exports = router;