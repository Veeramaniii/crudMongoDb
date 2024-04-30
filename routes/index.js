const express = require('express');
const model = require('../models');
const router = express.Router();
const url = require('url');
const nodemon = require('nodemon');
router.post('/movies', async (req, res) => {
    const data = new model({
        name: req.body.name,
        serviceType: req.body.serviceType,
        genre: req.body.genre,
        experience: req.body.experience,
        contact: req.body.contact,
        location: req.body.location
    });
    try {
        const dataToSave = await data.save();
        res.status(201).json(dataToSave);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }

});
router.get('/getData', async (req, res) => {
    try {
        const data = await model.find();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

//get by genere

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


// get Ascending genre

router.get('/sort', async (req, res) => {
    try {
        const data = await model.find().sort({ name: -1 }); // Ascending sort by name
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



//for searching titles

/* Define route for searching movies
router.get("/search/:key",async (req,resp)=>{
    let data = await model.find(
        {
            "$or":[
                {name:{$regex:req.params.key}},
                {genre:{$regex:req.params.key}}
            ]
        }
    )
    resp.send(data);

})*/

//search by query

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



router.get('/getData/:id', async (req, res) => {
    try {
        const data = await model.findById(req.params.id);
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});
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
router.delete('/getData/:id', async (req, res) => {
    try {
        const result = await model.findByIdAndDelete(req.params.id, req.body)
        res.send('Data successfully deleted');
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});
module.exports = router;

