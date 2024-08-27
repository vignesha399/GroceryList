import { useStore } from "../stores";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Button,
  IconButton,
  Dialog,
  styled,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";

export let AddItem = function () {
  const store = useStore();
  const [totalEditable, setTotalEditable] = useState(false);
  const [quantityValue, setQuantityValue] = useState();
  let number = store.number;
  store.setNumberIncrement();
  addSerialNum();
  return (
    <>
      <tr style={{ "background-color": "rgb(203, 247, 237)" }}>
        <td id={`sno${number}`} class="class" contentEditable>
          {document.getElementsByTagName("tr").length}
        </td>
        <td
          id={`itemname${number}`}
          class={"class"}
          contentEditable={true}
        ></td>
        <td id={`quantity${number}`}>
          <input
            style={{
              outline: "none",
              border: "none",
              width: "100%",
              height: "100%",
              textAlign: "center",
            }}
            type="number"
            min={0}
            width={"fit-content"}
            onChange={(e) => calculate("quantity" + number)}
          />
        </td>
        <td id={`price${number}`}>
          <input
            style={{
              outline: "none",
              border: "none",
              width: "100%",
              height: "100%",
              textAlign: "center",
            }}
            type="number"
            min={0}
            width={"fit-content"}
            onChange={() => calculate("price" + number)}
          />
        </td>
        <td
          id={`total${number}`}
          className={"class"}
          contentEditable={totalEditable}
        ></td>
        <td id={`delt${number}`} onClick={() => removeElement("delt" + number)}>
          <p
            style={{
              "background-color": "red",
              "text-align": "center",
              "border-radius": "50px",
              hight: "50%",
              padding: "5px",
              cursor: "default",
              maxHeight: "30px",
              maxWidth: "30px",
            }}
          >
            X
          </p>
        </td>
      </tr>
    </>
  );
};

// remove rows
export function removeElement(delt) {
  let reg = /\d+/g;
  let id = reg.exec(delt)[0];
  if (
    document.getElementById("quantity" + id).parentElement
      .previousElementSibling?.firstElementChild?.nextElementSibling
      ?.nextElementSibling
  ) {
    let orgID = document
      .getElementById("quantity" + id)
      .parentElement.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.getAttribute(
        "id"
      );
    calculate(`quantity${reg.exec(orgID)[0]}`);
  } else if (
    document.getElementById("quantity" + id).parentElement.nextElementSibling
      ?.firstElementChild?.nextElementSibling?.nextElementSibling
  ) {
    let orgID = document
      .getElementById("quantity" + id)
      .parentElement.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.getAttribute(
        "id"
      );
    calculate(`quantity${reg.exec(orgID)[0]}`);
  } else {
    document.getElementById("toAV").textContent = 0;
  }
  document.getElementById(delt).parentElement.remove();
  addSerialNum();
}
// adding serial number
function addSerialNum() {
  let arr = document.getElementsByTagName("tr");
  for (let index = 1; index < arr.length; index++) {
    arr[index].firstElementChild.textContent = index;
  }
}
// calculate price
function calculate(eleId) {
  let regex = /\d+/g,
    arr = document.getElementsByTagName("tr"),
    v = regex.exec(eleId)[0],
    // let v = eleId.match(/\d+/g).toLocaleString(),
    v2 = 1;
  let eleId1 = "quantity" + v,
    eleId2 = "price" + v,
    total = "total" + v,
    eleIdVal1,
    eleIdVal2,
    oValue = 0;
  setTimeout(() => {
    eleIdVal1 = document.getElementById(eleId1).firstElementChild.value;
    eleIdVal2 = document.getElementById(eleId2).firstElementChild.value;
    if (
      document.getElementById(eleId1).firstElementChild.value == null ||
      undefined ||
      NaN
    ) {
      eleIdVal1 = 1;
    }
    if (
      document.getElementById(eleId2).firstElementChild.value == null ||
      undefined ||
      NaN
    ) {
      eleIdVal2 = 1;
    }
    v2 = eleIdVal1 * eleIdVal2;
    if (
      document.getElementById(eleId).firstElementChild.value == null ||
      undefined ||
      NaN
    ) {
      document.getElementById(total).textContent = 0;
    } else {
      document.getElementById(total).textContent = v2;
    }
  }, 0.4);
  setTimeout(() => {
    for (let index = 1; index < arr.length; index++) {
      let temp = parseFloat(
          arr[index].firstElementChild.nextElementSibling.nextElementSibling
            .nextElementSibling.nextElementSibling.textContent
        ),
        value;
      if (temp.toString().trim() === "NaN".toString()) {
        value = 0;
      } else {
        value = temp;
      }
      oValue = oValue + value;
      let text = document.getElementById("toAV").textContent;
      if (text >= 0 || !isNaN(text)) {
        document.getElementById("toAV").textContent = oValue;
      } else {
        document.getElementById("toAV").textContent = 0;
      }
    }
  }, 0.5);
}

export function PrintPage(props) {
  const { openPop, setOpenPop, typoGText, buttonName } = props.open;

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(1),
      "margin-right": theme.spacing(5),
      "margin-top": theme.spacing(3),
      "margin-left": theme.spacing(2),
      "margin-bottom": theme.spacing(0),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  const handleClose = () => {
    setOpenPop(false);
  };
  const handleSave = () => {
    downloadFile();
    handleClose();
  };

  const downloadFile = () => {
    const htmlElement =
      document.getElementById("downloaddiv").offsetWidth <
      document.getElementById("tableGroceListTable").offsetWidth
        ? document.getElementById("tableGroceListTable")
        : document.getElementById("downloaddiv");

    html2canvas(htmlElement).then((canvas) => {
      const pdf = new jsPDF({
        orientation: "l",
        unit: "px",
        format: [
          htmlElement.scrollHeight + 10,
          htmlElement.offsetWidth > 999 ? htmlElement.offsetWidth + 10 : 999,
        ],
      });
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 50, 50);
      pdf.save("Grocery list");
    });
  };
  return (
    <React.Fragment>
      {openPop ? (
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openPop}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Typography gutterBottom>{typoGText}</Typography>
          </DialogContent>
          <hr />
          <DialogActions>
            <Button autoFocus onClick={handleSave}>
              {buttonName}
            </Button>
          </DialogActions>
        </BootstrapDialog>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}
//  function
export function logout(props) {
  document.cookie = `_our=; expires=-999; SameSite=localhost; Secure;`;
  props.logOut.setRender(!props.logOut.render);
  props.logOut.store.isLogged = false;
}

function alertBox(alertMessage) {
  let container = document.createElement("div");
  container.setAttribute("id", "alertBoxContainer");
  container.setAttribute(
    "style",
    "position: absolute;max-width: 10%;min-width: 200px; border:1px solid white;padding: 2%;border-radius: 7px; top:50%;left:50%;transform: translate(-50%, -50%);background-color:#fff;box-shadow: 10px 5px 5px black; font-family: Lucida Sans;cursor:pointer"
  );
  let p = document.createElement("p");
  p.setAttribute("id", "alertp");
  p.setAttribute("style", "margin:0px; padding: 3px;font-size:20px;");
  p.innerText = alertMessage;
  let textArea = document.createElement("textarea");
  textArea.setAttribute(
    "style",
    "border: none;width: 80%; height: 20px;border-bottom:1px solid black;resize: none"
  );
  textArea.setAttribute("id", "textarea");
  let okButton = document.createElement("button");
  okButton.setAttribute("value", "ok");
  okButton.setAttribute("id", "okButton");
  okButton.setAttribute("onClick", "alertbox.reqd()");
  okButton.innerText = "ok";
  okButton.setAttribute(
    "style",
    "border:none;padding: 5px;width: 40%;margin: 3%; height: 20%;border-radius: 5px; font-family: Lucida Sans"
  );
  let canButton = document.createElement("button");
  canButton.setAttribute("value", "cancel");
  canButton.setAttribute("id", "canButton");
  canButton.setAttribute("id", "canButton");
  canButton.innerText = "cancel";
  canButton.setAttribute(
    "style",
    "border:none;padding: 5px;width: 40%;margin: 3%; height: 20%;border-radius: 5px; font-family: Lucida Sans"
  );
  document.body.appendChild(container);
  container.append(p);
  container.append(textArea);
  container.append(okButton);
  container.append(canButton);
  let textValue;
  let bool = (document.getElementById("okButton").onClick = function () {
    (textValue = document.getElementById("textarea").value);
    // localStorage.setItem("textValue",textValue)
    document.getElementById("alertBoxContainer").remove();
    textValue = bool();
    return textValue;
  });
  //  iframe.contentDocument
  return textValue;
}
