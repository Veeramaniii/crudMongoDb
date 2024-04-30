const express = require('express');
const model = require('../models');
const router = express.Router();
const url = require('url');
const nodemon = require('nodemon');
router.get('/fetch/:genre', async (req, res) => {
    try {
        console.log(req.params.genre);
        console.log(req.params);
        const { genre } = req.params.genre
        const data = await model.find(req.params)
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

});
