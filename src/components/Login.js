import { useEffect } from "react";
import { useStore } from "../stores";
import file from "./DB/file.json";

export async function LoginFunc(ev) {
  const store = useStore();
  useEffect(() => { }, [])
  return (
    <>
      {store.isLogged ? (
        (await import("./ContentPage.jsx")).then(
          ({ ContentPage }) => ContentPage
        )
      ) : (
        <></>
      )}
    </>
  );
}
function reg() {
  let d = {
    uname: "value",
    pass: "pass",
  };

  // writeFileSync('file.json',JSON.stringify(d))
}
export async function writeFileSync(data) {
}
export let forgotPassword=(un, pass)=> {
  console.log(un, pass);
  new Promise(async (res, rej) => {
    res(file);
  })
    .then(
      async (a) => {
        const value = a.data.find((e) => {
          return (e.uname === un) ? true : false;
        })
        console.log(value);
        if (value && value.uname) { 
          await writeFileSync(pass);
        }
      },
      (e) => console.log(e)
    );

}
