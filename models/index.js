const mongoose = require('mongoose');

const dataschema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    serviceType:{
        required:true,
        type:String
    },
    genre:{
        required:true,
        type:String
    },
    experience:{
        required:true,
        type:Number
    },
    contact:{
        required:true,
        type:Number
    },
    location:{
        type:String
    },

})

module.exports = mongoose.model('host',dataschema);