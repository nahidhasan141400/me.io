let path = require('path');
let {v4 : uuidv4 } = require('uuid')

// import coustom lib
const {Read , Write} = require('../lib/crud');
// import auth midelware 
let {auth,Unauth} = require('../medelware/auth');

//path

const dataPath = path.join(__dirname,path.normalize('../data/data.json'));
const cookPath = path.join(__dirname,path.normalize('../data/cook.json'))
const myDataPath = path.join(__dirname,path.normalize('../data/mydata.json'))

module.exports = function api(app){
    app.get('/data/link',(req,res)=>{
        let data = Read(dataPath);;
        res.json(data.links);
    });
    app.get('/data/projects',(req,res)=>{
        let data = Read(dataPath);;
        res.json(data.project);
    });
    app.get('/data/:name',(req,res)=>{
        let {name} = req.params;
        let data = Read(myDataPath);
        if(data.indexOf(name) === -1){
            return res.status(500).send({err:"your file name is wrong"})
        }
        let mydataFor=Read( path.join(__dirname,path.normalize(`../myData/${name}`)))
        res.status(200).json(mydataFor)
    })
        

}