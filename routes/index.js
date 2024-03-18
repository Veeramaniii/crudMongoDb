const express = require('express');
const model = require('../models');
const { Model } = require('mongoose');
const router = express.Router();

router.post('/movies', async(req,res)=>{
    const data = new model({
        name:req.body.name,
        serviceType:req.body.serviceType,
        genre:req.body.genre,
        experience:req.body.experience,
        contact:req.body.contact,
        location:req.body.location
    });
try{
    const dataToSave = await data.save();
    res.status(201).json(dataToSave);
}
catch(error){
res.status(400).json({message:error.message})
}
    
})
module.exports = router;