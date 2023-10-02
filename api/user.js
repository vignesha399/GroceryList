const router = require('express').Router();
const save = require('./save.json');
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const fs = require('fs')

let myUser = []
function tokenVerify(req,res){
    console.log(req);
}tokenVerify()
router.get('/', (req, res) => {
    res.setHeader('Content-Type','text/html')
    try{
        if(jwt.verify(req.cookies.token,'secretKey')){
            let token = jwt.decode(req.cookies.token)
            console.log(token);
            res.clearCookie();
            res.end(
                fs.readFileSync('./GroceryList/GroceryList/gGros.html',(err,data)=>{
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
            );
        }else{
            res.redirect('.........')
        }
    }catch{
        res.send(401)
    }
    console.log(req.signedCookies);
})

// router.get('/:id', (req, res) => {
//     let id = req.params.id;
//     console.log(id);
//     {
        
//     }
//     try{
//         if(jwt.verify(req.cookies.token,'secretKey')){
//             let filerUser = save
//             .filter(v => {
//                 v.data.
//                     filter((v) => {
//                         console.log(v.id == id);
//                         if (v.id == id) {
//                             // v = Buffer.from(v,'utf-8').toLocaleString();
//                             res.status(200).contentType('html').send(v);
//                         }
    
//                     })
//             })
//             res.json(filerUser)
//         }else{
//             res.sendStatus(403)
//         }
//     }catch {
//         res.send(401);
//     }
// })

// router.post('/', (req, res) => {
//     let id = 2;
//     let name = req.body.name;
//     let email = req.body.email;
//     if (name || email) {
//         // res.write(name,email)
//         console.log(req.body.name, email);
//         let user = {
//             'id': id,
//             'name': name,
//             'email': email
//         }
//         let buffFile = Buffer.from(JSON.stringify(user), 'utf-8').toString()
//         myUser.push(user);
//         console.log(JSON.stringify(user));
//         res.json(myUser);

//     } else {
//         name = ' '
//         email = ' email ';
//         res.json(save)
//     }
// })

// router.put('/', (req, res) => {

//     myUser.filter(v => {
//         if (v.id == req.body.id) {
//             v.email = req.body.email;
//             res.json(myUser)
//         }

//         console.log(v);
//     });
// })

// router.delete('/:id', (req, res) => {
//     let m = myUser.filter(v => {
//         if (parseInt(req.params.id) == parseInt(v.id)) {
//             let indox = myUser.indexOf(v)
//             console.log('if running', myUser.indexOf(v), v, myUser.splice(indox, 1));
//             return myUser;
//         }
//     })
//     console.log(m);
//     res.json(myUser)

//     // console.log('mime ',myUser.filter(v=>{console.log(myUser.indexOf(v));}));
// })



module.exports = router;