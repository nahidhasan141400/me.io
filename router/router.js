
    let path = require('path');
    let {v4 : uuidv4 } = require('uuid')
    
    // import coustom lib
    const {Read , Write} = require('../lib/crud');
    // import auth midelware 
    let {auth,Unauth} = require('../medelware/auth');
    
    //path
    
    const dataPath = path.join(__dirname,path.normalize('../data/data.json'));
    const cookPath = path.join(__dirname,path.normalize('../data/cook.json'))
    const mydt = path.join(__dirname,path.normalize('../data/mydata.json'))
    
    


function rout(app){
           
            
        // set route 
        // set home route 
            app.get('/',(req,res)=>{
                res.render("home");
            });
            
            app.get('/api',auth,(req,res)=>{
                let data =  Read(mydt)
                res.render('user',{data})
                
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
            // add link 
           let link = require('./link')(app);
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
            app.get('/deletename',auth,(req,res)=>{
                
                let data = Read(dataPath);
                let temp = {...data};
                
                temp.name='no data';
                Write(dataPath,temp);
                res.redirect('/datas')
            })
            app.get('/deletedes',auth,(req,res)=>{
                
                let data = Read(dataPath);
                let temp = {...data};
                
                temp.des='no data';
                Write(dataPath,temp);
                res.redirect('/datas')
            })
            // login 
        let login = require('./login')(app);
            
        // api route 
        app.get('/tree',auth,(req,res)=>{
            res.redirect('/data');
        })

        app.get('/data',(req,res)=>{
            let data = Read(dataPath);
            res.status(200).json(data);
        });
        let api = require("./api");
        api(app);


}

module.exports = rout;