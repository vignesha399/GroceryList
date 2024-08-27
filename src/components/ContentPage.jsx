import "./gGros.css";
import { AddItem, logout, PrintPage } from "./AddItem";
import { useCallback, useEffect, useState } from "react";
import { Button, Table, TableBody, TableHead } from "@mui/material";
import { useStore } from "../stores";
import { openSocket } from "../webSocket";

export function ContentPage(props) {
  const [allRow, setRow] = useState([]);
  const [openPop, setOpenPop] = useState(false);
  const store = useStore();
  
  let setDownloadPopUpTrue = () => {
    setOpenPop(true);
  };
  // let setDownloadPopUpFalse = () => {
  //   setOpenPop(false);
  // };
  let addRow = useCallback(() => {
    setRow([...allRow, <AddItem />]);
  });

  useEffect(() => {
    setRow([...allRow, <AddItem />]);
  }, []);

  return (
    <>
      {store.isLogged && (
        <>
          <nav>
            <p id="logout" onClick={() => logout(props)}>
              <Button style={{color: "white"}}>logout</Button>
            </p>
          </nav>
          <center>
            <div id="tableGroceListDiv">
              <div id="downloaddiv">
                <h1 style={{ color: "black" }}>
                  <center>Grocery List</center>
                </h1>
                <Table id="tableGroceListTable">
                  <TableHead>
                    <tr>
                      <th id="sno">S.No</th>
                      <th>item name</th> <th>quantity (Kg,g or unit)</th>
                      <th>price</th>
                      <th>total price</th>
                    </tr>
                  </TableHead>
                  <TableBody id={"tableGroceList"}></TableBody>
                  {allRow}
                  {/* <!-- <tr style="background-color: rgb(203, 247, 237);"><td id="sno1" class="class" contenteditable>1</td> <td id="itemname1" class="class" contenteditable></td> <td id="quantity1" class="class" contenteditable onkeypress="calculate(price1)"></td> <td id="price1" class="class" contenteditable onkeypress="calculate(price1)"></td><td id="total1" class="class" contenteditable></td></tr> --> */}
                </Table>
                <p
                  id="toA"
                  style={{
                    width: "100%",
                    padding: "3px",
                    "border-radius": "5px",
                    position: "relative",
                    cursor: "default",
                    right: "0px",
                  }}
                >
                  Total Amount = <span id="toAV"></span>
                </p>
              </div>
              <div id="buttonDiv">
                <Button
                  style={{
                    border: "1px solid darkred",
                    width: "fit-content",
                    padding: "3px",
                    "border-radius": "5px",
                    cursor: "default",
                  }}
                  variant="contained"
                  onClick={addRow}
                >
                  Add item
                </Button>
                <Button
                  style={{
                    border: "1px solid darkred",
                    width: "fit-content",
                    padding: "3px",
                    "border-radius": "5px",
                    cursor: "default",
                  }}
                  variant="contained"
                  onClick={setDownloadPopUpTrue}
                >
                  Download list
                </Button>
              </div>
              <div>
                {openPop && <PrintPage open={{ openPop, setOpenPop, typoGText:'save as a PDF?', buttonName:'Save PDF' }} />}
              </div>
            </div>
          </center>
        </>
      )}
    </>
  );
}
