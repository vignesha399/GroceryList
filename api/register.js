const router = require('express').Router()
const mysql = require('mysql')



let script = 'insert into sakila.myusers values("15","ram","v","ram.v@gmail.com")';
let getCmd = 'select * from myusers where first_name = "vignesh"';
let db = mysql.createConnection({
        host:'localhost',
        user:'Root1',
        password:'root'
    })
    db.connect((err)=>{
        if(err)res.json(err)
        console.log('connection done ;');
    })
router.get('/',(req,res)=>{
    
    db.query(script,(err,resp)=>{
        if(err){
            let v = Buffer.from(err.toString(),'utf-8').toString();
            res.json(err);
        };
        if(resp)res.json(resp);
        res.write('query 1 done ;');

    })
    
    // res.end("query inserted!")
})
router.get('/',(req,res)=>{
    db.query(getCmd,(err,resp)=>{
        if(err){
            let v = Buffer.from(err.toString(),'utf-8').toString();
            res.write(v)
        };
        if(resp)res.write(resp); 
        console.log('query 2 done ;');

    })
    res.end('query2 done')
})

module.exports = router