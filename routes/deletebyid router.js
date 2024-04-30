const express = require('express');
const model = require('../models');
const router = express.Router();
const url = require('url');
const nodemon = require('nodemon');
router.delete('/getData/:id', async (req, res) => {
    try {
        const result = await model.findByIdAndDelete(req.params.id, req.body)
        res.send('Data successfully deleted');
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}); 