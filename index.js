const express = require('express');
const app = express();
const router = require('express').Router()
const https = require('https');
const fs = require('fs');
const uuid = require('uuid')
const cookieParser = require('cookie-parser');
const EventEmitter = require('events');
// const gindexH =  require('./GroceryList/GroceryList/index.html');




let data = '';
// let app1 = router.get('/',(req,res)=>{
//     req.on('data', c=>{data+=c});
//     req.on('end',_=>{console.log(data,(uuid.v5));})
//     res.write("hello")
//     res.end(data,req.url,);

//     console.log();
// })
app.use(cookieParser());
const ee = new EventEmitter
console.log(ee.getMaxListeners(ee));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/api/user/signs/decode',require('./sign'))
app.use('/api/user/sign',require('./sign'))
app.use('/api/user/',require('./api/user'))
app.use('/api/register',require('./api/register'))
app.use('/main/page',require('./db'))
app.use('/',require('./sign'))

// app.use(app1)



app.listen(3000,()=>{
    console.log('server is started to run...');
})


