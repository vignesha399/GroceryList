const { signedCookie } = require('cookie-parser');
const jwt = require('jsonwebtoken');
const router = require('express').Router()

let user =
{
    "id": 1,
    "email": "janet.weaver@reqres.in",
    "first_name": "Janet",
    "last_name": "Weaver",
    "avatar": "https://reqres.in/img/faces/2-image.jpg"
}
let option = {
    "domain":'localhost',
    "expires":'15000',
    "secure":true,
    "signed":true
}
router.get('/', (req, res) => {
    jwt.sign(user, 'secretKey', (err, token, v) => {
        if (err) console.log(err);
        if (token) {
            var dt = new Date();
            let min = dt.getMinutes()+1;
            var time = dt.getHours() + ":" + min + ":" + dt.getSeconds();
            
            console.log(time,dt.getMinutes()+5);
            res.clearCookie("token");
            res.cookie("token",token,{domain:'localhost',maxAge:6*1000,httpOnly:true,path:'/',secure:true})
            // res.cookie("token",token,{signed:true})
            console.log('signed',process.env.TZ);
        }
        // ,{maxAge :" 21 Oct 2015 07:28:00 GMT",signed:true,httpOnly:true,domain:"localhost",secure:true})
        // res.cookie('token',token,{maxAge:'15000',httpOnly:true,signed:true,path:req.baseUrl});
        // if (v) console.log(v);

        res.json({ 'err': err, 'token': token, 'v': v, "authorization": req.signedCookies })
        console.log(req.session);
    })

})
router.get('/decode', (req, res) => {
    let token = jwt.decode(req.headers.cookie)
    res.json(token);
})


module.exports = router;