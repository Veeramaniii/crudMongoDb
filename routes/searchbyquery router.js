const express = require('express');
const model = require('../models');
const router = express.Router();
const url = require('url');
const nodemon = require('nodemon');
router.get('/search', async (req, res) => {
    try {
        let query = {};
 console.log(req.query.name)
        // Check if query parameters are provided
        if (req.query.name) {
            const nameComponents = req.query.name.split(" ");
            query.name = { $all: nameComponents.map(component => new RegExp(component, 'i')) }; // case-insensitive search for all components
        }
        if (req.query.genre) {
            query.genre = { $regex: req.query.genre, $options: 'i' };
        }
        if (req.query.location) {
            query.location = { $gte: req.query.location};
        }

        const products = await Product.find(query);
        res.json(products);
    } catch (err) {
        console.error(err); // Log the error for debugging purposes
        res.status(500).json({ message: 'Internal Server Error' });
    }
});