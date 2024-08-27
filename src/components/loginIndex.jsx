import { useEffect, useState } from "react";
import style from "../components/gindex.css";
import { ContentPage } from "./ContentPage";
import { useStore } from "../stores";
import file from "./DB/file.json";
import { encodedText, makeCookie, sign, publicKey } from "./encrypts";
import { Button } from "@mui/material";
import { ForgotPassword, forgotPassword } from "./Login";

async function getCredentials(ev, render, setRender, store) {
  // const [state, setState] = useState(false);
  ev.preventDefault();
  let keys,
    value = "",
    id,
    avatar,
    uname = "tr",
    upass = "tuo",
    formfl = ev.target,
    formObj = new FormData(formfl),
    uarr = {};
  formObj.forEach((keys, value) => {
    uarr[value] = keys;
  });
  keys = uarr.uname;
  value = uarr.pass;
  new Promise(async (res, rej) => {
    res(file);
  })
    .then(
      (v) => {
        return v;
      },
      (e) => console.log(e)
    )
    .then(
      (a) => {
        for (let index = 0; index < a.data.length; index++) {
          uname = a.data[index].uname;
          upass = a.data[index].pass;
          id = a.data[index].id;
          checkCriendials(
            uname,
            upass,
            keys,
            value,
            id,
            render,
            setRender,
            store
          );
        }
      },
      (e) => console.log(e)
    );
  // await fetch("https://reqres.in/api/users?page=2")
  //   .then((v) => v.json())
  //   .then((a) => {
  //     for (let index = 0; index < a.data.length; index++) {
  //       uname = a.data[index].email;
  //       upass = a.data[index].first_name;
  //       id = a.data[index].id;
  //       avatar = a.data[index].avatar;
  //       console.log(uname, upass, id);
  //       return checkCriendials(uname, upass, keys, value, id, avatar);
  //     }
  //   });
}

function checkCriendials(
  iname,
  ipass,
  un,
  upass,
  id,
  render,
  setRender,
  store,
  avatar
) {
  // console.log(iname, ipass, un, upass, id, render, setRender);

  if (un == iname && upass == ipass) {
    makeCookie(iname, ipass, avatar, id)
      .then((e) => {
        console.log(e);
      })
      .then(async (_) => {
        let date = new Date(
          new Date().getFullYear() + 1,
          new Date().getMonth(),
          new Date().getDate(),
          new Date().getHours() + 1,
          new Date().getMinutes()
        );
        document.cookie = `_our=${new Uint8Array(sign) + "-" + encodedText
          }; expires=${date}; SameSite=localhost; Secure;`;
        await window.crypto.subtle
          .verify(
            {
              name: "ECDSA",
              hash: { name: "SHA-256" },
            },
            publicKey,
            new Uint8Array(sign),
            encodedText
          )
          .then(
            (e) => (store.isLogged = true, setRender(!render)),
            (e) => console.error("error : " + e)
          );
      });
  } else {
    document.getElementById("p").innerHTML =
      '<p id="p1" style="color:red;font-style:italic;"> login failed,  username or password wrong </p>';
  }
}

// function checkUserName(ev) {
//   let keys, value, formfl = ev.target,
//     formObj = new FormData(formfl),
//     uarr = {};
//   formObj.forEach((keys, value) => {
//     uarr[value] = keys;
//   });
//   keys = uarr.uname;
//   value = uarr.pass;
//   console.log(keys, value);

// }

const Login = function () {
  const [un, setUN] = useState("");
  const [pa, setPA] = useState("");
  const [cpa, setCPA] = useState("");
  let [render, setRender] = useState(false);
  let [forgotPass, setForgotPass] = useState(false);
  let [createAcc, setCreateAcc] = useState(false);
  const store = useStore();
  let onDisable = () => {
    if (un.length !== 0 && pa.length !== 0 && !forgotPass && !createAcc) return false;
    if (cpa == pa && cpa !== '') return false
    return true;
  }, error = () => {
    console.log(forgotPass);

    // if (forgotPass) {
    //   new Promise(async (res, rej) => {
    //     res(file);
    //   })
    //     .then(
    //       (a) => {
    //         const value = a.data.find((e)=>{
    //           console.log(e.uname, un);

    //           return (e.uname === un);
    //         })
    //         console.log(value);
    //         let clas = value&&value.uname?'loginInput':'invalid'
    //         document.getElementById('uname').className = clas;
    //       },
    //       (e) => console.log(e)
    //     );
    // }
  }
  let handleUNChange = (e) => setUN(e.target.value)
  let handlePassChange = (e) => setPA(e.target.value)
  let handlecPassChange = (e) => setCPA(e.target.value)
  let formSubmit = (e) => {
    getCredentials(e, render, setRender, store);
  };
  let forgotFormSubmit = (e) => {
    e.preventDefault();
    
  };
  let createFormSubmit = (e) => {
    getCredentials(e, render, setRender, store);
  };
  let SubmitButton = () => {
    return (
      <button disabled={onDisable} className="LoginButton">
        {" "}
        submit{" "}
      </button>
    );
  };
  useEffect(() => {
    onDisable();
    error()
  }, [un, pa, cpa]);
  console.log(useStore().isLogged);

  return (
    <>
      {/* {useStore().isLogged ? <LoginForm /> : <LoginForm />} */}
      {useStore().isLogged ? <ContentPage logOut={{ render, setRender, store }} /> : (!forgotPass && !createAcc) ? (<div className="loginBody">
        <div id="formDiv" className="loginDiv">
          <form onSubmit={formSubmit} method="post" autoComplete="off">
            <div>
              <label className="loginLabel" for="uname">
                Email{" "}
              </label>
              <input
                type="text"
                name="uname"
                id="uname"
                className="loginInput"
                placeholder="email"
                onChange={(e) => handleUNChange(e)}
                value={un}
                required
              />
              <label className="loginLabel" for="pass">
                Password{" "}
              </label>
              <input
                type="password"
                name="pass"
                id="pass"
                className="loginInput"
                placeholder="password"
                value={pa}
                onChange={(e) => handlePassChange(e)}
                required
              />
            </div>
            <div className="loginDiv">
              {!onDisable() && <SubmitButton />}
              <p id="forgot_password" onClick={() => setForgotPass(true)}>
                <a href="#">forget password</a>
              </p>
              <p id="create_account" onClick={() => setCreateAcc(true)}>
                <a href="#">Create Account</a>
              </p>
            </div>

            <div className="loginDiv">
              <p id="p" className="loginp"></p>
            </div>
          </form>
        </div>
      </div>) : (forgotPass) ?
        <>
          {/* forgot_password */}
          <Button onClick={() => setForgotPass(false)} style={{ color: "white", margin: "auto" }}>Back</Button>forgot Pass
          <div id="formDiv" className="loginDiv">
            <form onSubmit={forgotFormSubmit} method="post" autoComplete="off">
              <div>
                <label className="loginLabel" for="uname">
                  Email{" "}
                </label>
                <input
                  type="text"
                  name="uname"
                  id="uname"
                  className=""
                  placeholder="email"
                  onChange={(e) => (handleUNChange(e))}
                  value={un}
                  required
                />
                <label className="loginLabel" for="pass">
                  Password{" "}
                </label>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  className="loginInput"
                  placeholder="password"
                  value={pa}
                  onChange={(e) => handlePassChange(e)}
                  required
                />
                <label className="loginLabel" for="pass">
                  Password{" "}
                </label>
                <input
                  type="password"
                  name="cpass"
                  id="cpass"
                  className="loginInput"
                  placeholder="confirm password"
                  value={cpa}
                  onChange={(e) => handlecPassChange(e)}
                  required
                />
              </div>
              <div className="loginDiv">
                {!onDisable() && <SubmitButton />}
              </div>
              <div className="loginDiv">
                <p id="p" className="loginp"></p>
              </div>
            </form>
          </div>

        </> :
        <>
          {/* create_account */}
          <Button onClick={() => setCreateAcc(false)} style={{ color: "white", margin: "auto" }}> Back</Button> create_account
          <div id="formDiv" className="loginDiv">
            <form onSubmit={createFormSubmit} method="post" autoComplete="off">
              <div>
                <label className="loginLabel" for="uname">
                  Email{" "}
                </label>
                <input
                  type="text"
                  name="uname"
                  id="uname"
                  className="loginInput"
                  placeholder="email"
                  onChange={(e) => handleUNChange(e)}
                  value={un}
                  required
                />
                <label className="loginLabel" for="pass">
                  Password{" "}
                </label>
                <input
                  type="password"
                  name="pass"
                  id="pass"
                  className="loginInput"
                  placeholder="password"
                  value={pa}
                  onChange={(e) => handlePassChange(e)}
                  required
                />
                <label className="loginLabel" for="pass">
                  Password{" "}
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  className="loginInput"
                  placeholder="mobile"
                  value={pa}
                  onChange={(e) => handlePassChange(e)}
                  required
                />
              </div>
              <div className="loginDiv">
                {!onDisable() && <SubmitButton />}
              </div>

              <div className="loginDiv">
                <p id="p" className="loginp"></p>
              </div>
            </form>
          </div>

        </>
      }
      {/* <ContentPage /> */}
    </>
  );
};

export { Login };
