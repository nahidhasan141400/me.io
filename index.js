const express = require('express');
const app = express();
const { v4 : uuidv4 } = require('uuid') ;
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const path = require('path');
const fs = require("fs");
require('dotenv').config();
 
// configar multer 
const multer = require("multer");

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"myData/")
    },
    filename:(req,file,cb)=>{
        const unicName = `${file.originalname}`;
        cb(null,unicName);
    }
});

let upload = multer({
    storage,
    limits:{ fileSize: 1000000*100},
    fileFilter:(req,file,cb)=>{
        if(file.mimetype === "application/json"){
            cb(null,true)
        }else{
            cb(new Error("only json file are allow to upalod"))
        }
    }
}).single("file");


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
const myDataPath = path.join(__dirname+'/data/mydata.json');


// route
const { auth } = require('./medelware/auth');
//upload my data.
app.post("/upload",auth,(req,res)=>{
    // if(!req.file){
    //     return res.json({err:"upload file"})
    // }
    upload(req,res,(err)=>{
        if(err){
            return res.status(500).send({error: err.message})
        }else{
            let sdata = Read(myDataPath);
            if(sdata.indexOf(req.file.filename) !== -1){
                return res.send('file name already exist!')
            }
            sdata.push(req.file.filename);
            Write(myDataPath,sdata)
            res.redirect('/api')
        }
    })
});
app.get('/mydatadelete/:name',auth,(req,res)=>{
    let items = Read(myDataPath);
    let {name} = req.params;
    let index = items.indexOf(name)
    let numberOfElementToRemove = 1;
    if (index !== -1) {
         items.splice(index,numberOfElementToRemove);
         
         Write(myDataPath,items);
         fs.unlinkSync( path.join(__dirname,path.normalize(`./myData/${name}`)));

         res.redirect('/api')
        } else{
          return  res.send({error:"something is wrong!"})
        }

});
// route 
const rout = require('./router/router');
const { Read, Write } = require('./lib/crud');
rout(app);

app.use((err,req,res,next)=>{
    if(err){
        res.status(500).send(err.message);
    }else{
        res.send("sucsses")
    }
})
// init server 
app.listen(PORT , () => {
    console.log(`Go to localhost:${PORT}`)
})
