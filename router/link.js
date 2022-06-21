let path = require('path');
let {v4 : uuidv4 } = require('uuid')

// import coustom lib
const {Read , Write} = require('../lib/crud');
// import auth midelware 
let {auth,Unauth} = require('../medelware/auth');

//path

const dataPath = path.join(__dirname,path.normalize('../data/data.json'));
const cookPath = path.join(__dirname,path.normalize('../data/cook.json'))

module.exports = function link(app){
    app.get('/addlink',auth,(req,res)=>{
        res.render('addlink',{err:""})
    })
    app.post('/addlink',auth,(req,res)=>{
        const {name,link} = req.body;
        let data = Read(dataPath);
        let tempdata = {...data};
        for (const key in tempdata.links) {
            if(key === name){
              return  res.render("addlink",{err:"link name alredy use"})
            }
        };
       
            tempdata.links[name] = link;
            Write(dataPath,tempdata);
            res.redirect('/datas')
    });
    app.get('/dell/:id',auth,(req,res)=>{
        let {id:name} = req.params;
        let data = Read(dataPath);
        let tempdata = {...data};
        delete tempdata.links[name];
        Write(dataPath,tempdata);
        res.redirect('/datas');
    })
    app.get('/edit/:name',auth,(req,res)=>{
        let {name} = req.params;
        let data = Read(dataPath);
        res.render("editlink",{data:{link:data.links[name],name}})
    });
    app.post('/updatelink',auth,(req,res)=>{
        const {name,link}=req.body;
        let data = Read(dataPath);
        let tempdata = {...data};
        tempdata.links[name] = link;
        Write(dataPath,tempdata);
        res.redirect('/datas');
    })
}