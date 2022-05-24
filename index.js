const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

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
// set home route 
    app.get('/',(req,res)=>{
        res.render("home");
    });
    app.get('/login',(req,res)=>{
        res.render("login");
    });
// set login route 
    app.post('/login',(req,res)=>{
        let {username , password} = req.body;
        console.log(process.env.PASSWORD);
        if(username === process.env.USER_NAME && password === process.env.PASSWORD){
            res.send(`<h1> wellcome ${username} you login sucssesfully</h1>`)
        }else{
            res.send('wrong password')
        }
        
    })

// init server 
app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`)
})