let path = require('path');
let {v4 : uuidv4 } = require('uuid')

// import coustom lib
const {Read , Write} = require('../lib/crud');
// import auth midelware 
let {auth,Unauth} = require('../medelware/auth');

//path

const dataPath = path.join(__dirname,path.normalize('../data/data.json'));
const cookPath = path.join(__dirname,path.normalize('../data/cook.json'))

module.exports = function login(app){
    app.get('/login',Unauth,(req,res)=>{
            
        res.render("login",{msg:""});
    
});
    
        // set login route 
        app.post('/login',(req,res)=>{

            let {username , password} = req.body;
            
            if(username === process.env.USER_NAME && password === process.env.PASSWORD){
                let newcook = uuidv4();
                res.cookie('me',newcook);
                Write(cookPath,{cook : newcook})
                res.redirect("/api")
            }else{
                res.render('login',{msg:"wrong info"})
            }
            
        })
        app.get('/logout',(req,res)=>{
            let newcook = uuidv4();
            res.cookie('me',newcook);
            Write(cookPath,{cook : newcook})
            res.cookie('me','');
            res.redirect('/')
        })

}