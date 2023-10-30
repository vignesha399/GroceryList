
'use-strict'
// import { writeFileSync } from "fs";
addEventListener('submit', login)
let formfl = document.forms.item("inputs");
console.log(window.document.cookies='');
async function login(ev){
    ev.preventDefault();
    let keys;
    let value;
    let id;
    let avatar;
    let uname = "tr";
    let upass = "tuo"
    formfl = ev.target;
    let formObj = new FormData(formfl);
    let uarr = {}
    formObj.forEach((keys,value) => {
        uarr[value] = keys;
    });
    keys = uarr.uname
    value = uarr.pass
    // await Promise.all([
    //     fetch('https://reqres.in/api/users?page=2').then(e=>e.json())
    //     // .then(e=>{console.log(e.uname)})
    //     .then((sampleResp) => {
    //         sampleResp.data
    //         upass = sampleResp["pass"]
    //         // checkCriendials(suname,spass,ipass)
    //     })
    // ])
    console.log(uname);

        let we1 = await fetch('file.json').then(v=>v.json()).then((a)=>{
            for (let index = 0; index < a.data.length; index++) {
                uname = a.data[index].uname;
                upass = a.data[index].pass;
                id = a.data[index].id;
                checkCriendials(uname,upass,keys,value,id);
            }

        })
        let we = await fetch('https://reqres.in/api/users?page=2').then(v=>v.json()).then((a)=>{
            for (let index = 0; index < a.data.length; index++) {
                uname = a.data[index].email;
                upass = a.data[index].first_name;
                id = a.data[index].id;
                avatar = a.data[index].avatar;
                console.log(uname, upass,id);
                checkCriendials(uname,upass,keys,value,id,avatar);
            }

        })
       async function checkCriendials(iname,ipass,un,upass,id,avatar){
            // let iutext = formfl.
            // console.log(iname,ipass," and ",un,"fd", upass);
            if(un == iname && upass == ipass){
                let date = new Date(new Date().getTime() + 1 * 1 * 1 * 1000);
                console.log(date);
                window.location.href=("./gGros.html");
                document.cookie = iname+"="+encodeURI(id+";"+ipass+";"+avatar+";")+"; SameSite=none; expires="+date+"; Secure`;";
                let value =""+iname+";"+ipass+";"+id+";"+avatar;
                document.cookie = "our"+"="+value+"; expires="+date+"; SameSite=None; Secure";


                // Define values.
                const api_key = 'YOUR_API_KEY'
                const api_secret = 'YOUR_API_SECRET'
                const user_id = `${iname}`

                // Initialize a Server Client
                // const serverClient = StreamChat.getInstance( api_key, api_secret);
                // // Create User Token
                // const token = serverClient.createToken(user_id);
                // const token2 = client.createToken(iname, Math.floor(Date.now() / 1000) + (60 * 60));
                // await client.revokeUserToken("user-id", revokeDate);
                // await client.revokeUsersToken(["user1-id", "user2-id"], revokeDate);

                // }

                // Set-Cookie: <cookie-name>=<cookie-value>
                // Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
                // Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
                // Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly
                // Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<number>
                // Set-Cookie: <cookie-name>=<cookie-value>; Partitioned
                // Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
                // Set-Cookie: <cookie-name>=<cookie-value>; Secure

                // Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Strict
                // Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Lax
                // Set-Cookie: <cookie-name>=<cookie-value>; SameSite=None; Secure

                // // Multiple attributes are also possible, for example:
                // Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>; Secure; HttpOnly

            }else{
                document.getElementById('p').innerHTML = '<p id="p1" style="color:red;font-style:italic;"> login failed,  username or password wrong </p>';
                console.log();
                // setTimeout(()=>{
                //     document.getElementById('p').remove
                // },1000)
            }
        }
        console.log(uname,upass,keys,value);

}
function reg(){
    let d= {
        uname:"value",
        pass:"pass"
    }
    writeFileSync('file.json',JSON.stringify(d))
}
function getCredit(sun, sup){
    console.log(sun, sup);
    console.log(" and ",sup);
    // checkCriendials(sun,sup);
}