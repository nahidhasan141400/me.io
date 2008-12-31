const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const path = require('path');

// set port 
const PORT = process.env.PORT || 3300;


app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());


// set Template engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs');

// set route 
app.get('/',(req,res)=>{
    res.render("home");
})

// init server 
app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`)
})