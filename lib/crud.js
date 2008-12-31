const fs = require('fs');
const { Module } = require('module');

// read function

const Read = (file_path)=>{
    let responce = fs.readFileSync(file_path , "utf8");
    let data = JSON.parse(responce);
    return data;
}

//write function

const Write = (file_path,data)=>{
    let jsonData = JSON.stringify(data);
        
    try {
        fs.writeFileSync(file_path, jsonData);
        return "done";
    } catch (error) {
        return error;
    }
}

module.exports = {Read,Write};