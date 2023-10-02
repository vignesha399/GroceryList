const { signedCookie } = require('cookie-parser');
const jwt = require('jsonwebtoken');
const router = require('express').Router()
const fs = require('fs')
const http = require('http');



router.get('/', (req, res) => {
    res.clearCookie('token');
    res.setHeader('Content-Type','text/html')
    console.log(req.baseUrl);
    if(req.baseUrl !== '/api/user/sign'){
        
        res.redirect(302,'http://localhost:3000/api/user/sign');
        res.end(fs.readFile('./GroceryList/GroceryList/index.html',(err,data)=>{
            if(err)res.errored(err);
            if(data){
                console.log(data);
                res.write(data,(err)=>{
                    res.write(err.message);
                });
            }
        }))
    }else{
        res.end(
            fs.readFileSync('./GroceryList/GroceryList/index.html',(err,data)=>{
                if(err)res.write(err);
                if(data){
                    console.log('line 62 : ',data);
                    let str = data.toString();
                    console.log('line 62 : ',str);
                    res.write(str,(err)=>{
                        res.write(err.message);
                    });
                }
            })
        )
    }
    
})
router.post('/',(req,res)=>{
    console.log(req.body.uname,req.body.pass);
    let user = {
        email:req.body.uname,
        pass:req.body.pass
    }
    res.clearCookie('token')
    jwt.sign(user, 'secretKey', (err, token, v) => {
        if (err) console.log(err);
        if (token) {
            var dt = new Date();
            let min = dt.getMinutes()+1;
            var time = dt.getHours() + ":" + min + ":" + dt.getSeconds();
            
            console.log(time,dt.getMinutes()+5);
            res.clearCookie("token");
            res.cookie("token",token,{domain:'localhost',maxAge:1440*1000,httpOnly:true,path:'/',secure:true})
            // res.cookie("token",token,{signed:true})
            console.log('signed',process.env.TZ);
        }
        // ,{maxAge :" 21 Oct 2015 07:28:00 GMT",signed:true,httpOnly:true,domain:"localhost",secure:true})
        // res.cookie('token',token,{maxAge:'15000',httpOnly:true,signed:true,path:req.baseUrl});
        // if (v) console.log(v);
    
        // res.json({ 'err': err, 'token': token, 'v': v, "authorization": req.signedCookies })
        
        console.log(req.session);
        res.end(res.redirect('.'))
        
    })
    router.get('/decode', (req, res) => {
        let token = jwt.decode(req.headers.cookie)
        res.json(token);
    })
    
})

module.exports = router;