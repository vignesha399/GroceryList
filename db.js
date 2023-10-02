const mysql = require('mysql');
const app = require('express').Router()
// const router = require('./sign');



let db = mysql.createConnection({
    host:'localhost',
    user:'Root1',
    password:'root'
})

let script = 'select * from sakila.actor';

db.connect((err)={
    if(err){
        console.log(err);
    }
})

app.get('/' , (req , res)=>{
    db.query(script,(err,resp)=>{
        if(err)res.json(err);
        if(resp)res.json(resp);
        
    })

})


module.exports = app