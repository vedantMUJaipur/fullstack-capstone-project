const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db');
const { ObjectId } = require('mongodb');

// Task 5 Route: Get all gifts
router.get('/', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const gifts = await collection.find({}).toArray();
        res.status(200).json(gifts);
    } catch (e) {
        res.status(500).send("Error fetching gifts: " + e.message);
    }
});

// Task 7 Route: Get gift by ID
router.get('/:id', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection("gifts");
        const id = req.params.id;
        
        const gift = await collection.findOne({ _id: new ObjectId(id) });
        
        if (!gift) {
            return res.status(404).send("Gift not found");
        }
        res.status(200).json(gift);
    } catch (e) {
        res.status(500).send("Error fetching gift: " + e.message);
    }
});

module.exports = router;