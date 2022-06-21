const { response } = require("express");
const path =  require('path')
// import coustom lib
const {Read , Write} = require('../lib/crud');
const cookiePath = path.join(__dirname,path.normalize('../data/cook.json'));

let auth=(req,res,next)=>{
    let {cook} = Read(cookiePath);
    if(req.cookies.me === cook){
        next()
    }else{
        return res.render('login',{msg:"frist you have to login!"})
    }
}
let Unauth=(req,res,next)=>{
    let {cook} = Read(cookiePath);
    if(req.cookies.me !== cook){
        next()
    }else{
            res.redirect("/")
            
    }
}

module.exports = {auth,Unauth};