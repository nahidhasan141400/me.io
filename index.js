const express = require('express');
const app = express();
const { v4 : uuidv4 } = require('uuid') ;
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();


// set port 
const PORT = process.env.PORT || 3300;

// config cors 
const cors = require("cors");
app.use(cors({
    origin : "*"
}))


// uuid
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
// console.log(uuidv4());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());


// set Template engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs');

const dataPath = path.join(__dirname+'/data/data.json');
const cookPath = path.join(__dirname+'/data/cook.json');

// route
const rout = require('./router/router');
rout(app);
// init server 
app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`)
})