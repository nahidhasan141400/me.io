const {Write} = require('./lib/crud');

const path = require('path');
const { opendirSync } = require('fs');

const dataPath = path.join(__dirname+'/data/data.json');

let data = {
    name:'nahid',
    age:'21'
}

let res = Write(dataPath,data)

console.log(res);