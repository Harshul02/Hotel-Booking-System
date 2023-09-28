const mongoose = require('mongoose');
require('dotenv').config()


// var mongoURL = 'mongodb://localhost:27017/hotelDB';
var mongoURL = process.env.DB_URL;
// console.log(mongoURL);

mongoose.connect(mongoURL, {useUnifiedTopology : true, useNewUrlParser : true});

var connection = mongoose.connection;

connection.on('error', ()=>{
    console.log("MongoDB connection failed");
});
connection.on('connected', ()=>{
    console.log("MongoDB connected Successfully");
});

module.exports = mongoose;