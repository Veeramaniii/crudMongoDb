const express = require('express');
const model = require('../models');
const router = express.Router();
const url = require('url');
const nodemon = require('nodemon');
router.get('/getData/:id', async (req, res) => {
    try {
        const data = await model.findById(req.params.id);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});