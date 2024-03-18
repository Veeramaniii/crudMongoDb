require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const mongoString = process.env.DATABASE_URL;
const app = express();
 const routes = require('./routes');
app.use(express.json());
app.use('/api',routes);
mongoose.connect(mongoString);
 const database = mongoose.connection;

 database.on('error',(error)=>{console.log('error',error)});
 database.on('connected',()=>{console.log('DATABASE Connected SuccesFully')});

app.listen(3000,()=>{
    console.log('server started at localhost 3000')
})