export let sign, promise, encodedText, publicKey;
export async function makeCookie(iname, ipass, avatar, id, cb) {
  const subtle = window.crypto.subtle;
  const textEncode = new TextEncoder();
  const textDecode = new TextDecoder();
    let privateKey;
  subtle
    .generateKey(
      {
        name: "ECDSA",
        namedCurve: "P-384",
      },
      true,
      ["sign", "verify"]
    )
    .then((keyPair) => {
      privateKey = keyPair.privateKey;
      publicKey = keyPair.publicKey;
    })
    .then(async () => {
      let date = new Date(
        new Date().getFullYear() + 1,
        new Date().getMonth(),
        new Date().getDate(),
        new Date().getHours() + 1,
        new Date().getMinutes()
      );
      //`${iname},${ipass},${id},${avatar}`
      let str = `${iname},${ipass},${id}`;
      encodedText = textEncode.encode(str);

      promise = new Promise(async (res, rej) => {
        sign = await subtle.sign(
          {
            name: "ECDSA",
            hash: { name: "SHA-256" },
          },
          privateKey,
          encodedText
        );
        document.cookie = `${iname}=${encodeURI(
          id + ";" + ipass + ";" + avatar + ";"
        )}; SameSite=localhost; expires=${date}; Secure; path=/`;
        res(sign);
      }).then(async (_) => {
        document.cookie = `_our=${new Uint8Array(sign)+"-"+encodedText}; expires=${date}; SameSite=localhost; Secure;`;
        await subtle.verify(
          {
            name: "ECDSA",
            hash: { name: "SHA-256" },
          },
          publicKey,
          new Uint8Array(sign),
          encodedText
        ).then(e=>console.log(e), e=>console.error('error : ' +e));
      });
    });
}
