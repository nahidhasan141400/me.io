let path = require('path');
let {v4 : uuidv4 } = require('uuid')

// import coustom lib
const {Read , Write} = require('../lib/crud');
// import auth midelware 
let {auth,Unauth} = require('../medelware/auth');

//path

const dataPath = path.join(__dirname,path.normalize('../data/data.json'));
const cookPath = path.join(__dirname,path.normalize('../data/cook.json'))

module.exports = function api(app){
    app.get('/data/link',(req,res)=>{
        let data = Read(dataPath);;
        res.json(data.links);
    })
    app.get('/data/projects',(req,res)=>{
        let data = Read(dataPath);;
        res.json(data.project);
    })
}