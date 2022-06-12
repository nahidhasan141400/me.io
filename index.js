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

// import auth midelware 
let {auth,Unauth} = require('./medelware/auth');

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
    // add route 
    app.get('/addProject',auth,(req,res)=>{
        res.render('addProject')
    });
    app.post('/addProject',auth,(req,res)=>{
        let data = Read(dataPath);
        let tempdata = {...data};
        let {name , link , img , des} = req.body;
        let id = uuidv4();
        tempdata.project[name] = {
            id,
            name,
            link,
            des,
            img
        }
        Write(dataPath,tempdata);
        res.redirect('/datas')
    })
    // update project data
    app.get('/updateProject/:id',auth,(req,res)=>{
        let id = req.params.id;
        let data = Read(dataPath);
        let index;
        for (const key in data.project) {
            if(data.project[key].id === id){
                 index = key;
            };
        };
        let d = data.project[index];
        res.render('uppro',{data:data.project[index]})
    })
    app.post('/uppro',auth,(req,res)=>{
        let {id ,name , link , des , img}=req.body;
        let data = Read(dataPath);
        let tempdata = {...data};
        let index;
        for (const key in tempdata.project) {
            if(tempdata.project[key].id === id){
                 index = key;
            };
        };
        tempdata.project[index] = {
            id,name,link,des,img
        }
        Write(dataPath,tempdata);
        res.redirect('/datas')
    })
    // dellet project data 
    app.get('/delletproduct/:id',auth,(req,res)=>{
        const {id} = req.params;
        let data = Read(dataPath);
        let tempdata = {...data};
        let index;
        for (const key in tempdata.project) {
            if(tempdata.project[key].id === id){
                 index = key;
            };
        };
        delete tempdata.project[index];
        Write(dataPath,tempdata);
        res.redirect('/datas');
    })
    // edit name and ds
    app.get('/editName',auth,(req,res)=>{
        let data = Read(dataPath);
        res.render('addName',{
            name:data.name,
            des:data.des,
        })
    });
    app.post('/updateName',auth,(req,res)=>{
        let {name,des} = req.body;
        let data = Read(dataPath);
        let temp = {...data};
        temp.name= name;
        temp.des=des;
        Write(dataPath,temp);
        res.redirect('/datas')
    });
    app.get('/deletedes',auth,(req,res)=>{
        
        let data = Read(dataPath);
        let temp = {...data};
        
        temp.des='no data';
        Write(dataPath,temp);
        res.redirect('/datas')
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