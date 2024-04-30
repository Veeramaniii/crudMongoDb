const express = require('express');
const model = require('../models');
const router = express.Router();
const url = require('url');
const nodemon = require('nodemon');
router.put('/getData/:id', async (req, res) => {
    try {
        const result = await model.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});