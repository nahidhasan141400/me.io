const express = require('express');
const app = express();
const { v4 : uuidv4 } = require('uuid') ;
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();

// import coustom lib
const {Read , Write} = require('./lib/crud');

// set port 
const PORT = process.env.PORT || 3300;

// config cors 
const cors = require("cors");
app.use(cors({
    origin : "*"
}))


// uuid
// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
console.log(uuidv4());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieParser());


// set Template engine
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs');

const dataPath = path.join(__dirname+'/data/data.json');
const cookPath = path.join(__dirname+'/data/cook.json');

// import auth midelware 
let {auth,Unauth} = require('./medelware/auth');
const { write } = require('fs');
// set route 
// set home route 
    app.get('/',(req,res)=>{
        res.render("home");
    });
    app.get('/login',Unauth,(req,res)=>{
       
            res.render("login");
        
    });
    app.get('/api',auth,(req,res)=>{
        // console.log(req.cookies);
        // if (req.cookies.me === '1234') {
        //     res.render('user')
        // }else{
        //     res.redirect('/login');
        // }
        res.render('user')
        
    })
    app.get('/datas',auth,(req,res)=>{
        let data = Read(dataPath);
        res.render('data',{data})
    })
// set login route 
    app.post('/login',(req,res)=>{
        let {username , password} = req.body;
        
        if(username === process.env.USER_NAME && password === process.env.PASSWORD){
            let newcook = uuidv4();
            res.cookie('me',newcook);
            Write(cookPath,{cook : newcook})
            res.redirect("/api")
        }else{
            res.send('wrong password')
        }
        
    })
    app.get('/logout',(req,res)=>{
        res.cookie('me','');
        res.redirect('/')
    })

// api route 

app.get('/data',(req,res)=>{
    let data = Read(dataPath);
    res.status(200).json(data);
})

// init server 
app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`)
})