"use strict"
// import Readline from 'Readline';
let tableGroceList = document.getElementById('tableGroceList');
let number =1
// create table columns
function addCol(){
  (function check(){
    let cname =[];
    let output = document.cookie;
    console.log(cname = output.split(';'));
    let date = new Date();
    // if(cname[0] !== "Name"){
      console.log(output,cname,output.expires);
    // }

  })();
    let td1 = document.createElement('td');
    td1.setAttribute('id',`sno${number}`)
    td1.setAttribute('class',`class sno`)
    let td2 = document.createElement('td');
    td2.setAttribute('id',`itemname${number}`)
    td2.setAttribute('class',`class`)
    td2.setAttribute('contenteditable','')
    let td3 = document.createElement('td');
    td3.setAttribute('id',`quantity${number}`)
    td3.setAttribute('class',`class`)
    td3.setAttribute('contenteditable','')
    td3.setAttribute('onkeydown',`calculate(quantity${number})`)
    let td4 = document.createElement('td');
    td4.setAttribute('id',`price${number}`)
    td4.setAttribute('class',`class`)
    td4.setAttribute('contenteditable','')
    // td4.setAttribute('onclick',`calculate(price${number})`)
    td4.setAttribute('onkeydown',`calculate(price${number})`)
    let td5 = document.createElement('td')
    td5.setAttribute('id',`total${number}`)
    td5.setAttribute('class',`class`)
    let td6 = document.createElement('td')
    td6.setAttribute('id',`delt${number}`)
    td6.setAttribute('class',`class`)
    td6.setAttribute('onclick',`removeElement(delt${number})`)
    td6.setAttribute('style',"background-color:red;text-align: center; border-radius:50px;hight:50%;")
    td6.innerText = 'x';
    let tr = document.createElement('tr')
    tr.setAttribute('id',`tr${number}`)
    tr.setAttribute('class',`class`)
    tableGroceList.append(tr);tr.append(td1);tr.append(td2);tr.append(td3);tr.append(td4);tr.append(td5);tr.append(td6);
    number++
    addSerialNum();
}  
// to remove the rows
function removeElement(delt){
  delt = delt.id
  delt = document.getElementById(delt).id.match(/\d+/g).toLocaleString();
  delt = 'tr'+delt;
  document.getElementById(delt).remove();
  addSerialNum();
}  
// adding serial number
function addSerialNum(){
  let arr = document.getElementsByTagName("tr");
  for(let index = 1; index < arr.length; index++){
    arr[index].firstElementChild.textContent = index;
  }
}
// to get the totalvalue
let arr = document.getElementsByTagName("tr");

tableGroceList.addEventListener('click',()=>{
  let array = document.getElementsByTagName("tr");
  for (let index = 0; index < array.length; index++) {
    const element = arr[index].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;

  }
  totalValue()
});
tableGroceList.addEventListener('keypress',()=>{
  let array = document.getElementsByTagName("tr");
  for (let index = 0; index < array.length; index++) {
    const element = arr[index].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;

  }
  totalValue()
});
console.log(document.body.children,arr.length);
function totalValue(){
  let oValue = 0
 setTimeout( ()=>{ for(let index = 1; index < arr.length; index++){
  // arr[index].firstElementChild.textContent = index;
  let value=parseFloat(arr[index].firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent);
  // if(value == null){value = 0}
  oValue = oValue+value;
  let text = document.getElementById('toAV').textContent;
  console.log(text);
  if(text >=0 || !isNaN(text)){
    document.getElementById("toAV").textContent = oValue;
  }else{
    document.getElementById("toAV").textContent = 0;
  }
  }},0.1)
}
// to calculate price
let idNum
let idVal
let eleId
let listerner
let eleIdVal1
let eleIdVal2
function calculate(eleId1){
    eleId = eleId1.id;
    let v = eleId.match(/\d+/g).toLocaleString();
    setTimeout(() => {
      eleIdVal1 = document.getElementById("price"+v).textContent;
      eleIdVal2 = document.getElementById("quantity"+v).textContent;
      if(document.getElementById("price"+v).textContent == null){
        eleIdVal1 = 1
      }if(document.getElementById("quantity"+v).textContent == null){
        eleIdVal2 = 1
      }
      let v2 = (eleIdVal1)*(eleIdVal2);
      if(document.getElementById("total"+v).textContent == null){
        document.getElementById("total"+v).textContent = v2
      }else{
        document.getElementById("total"+v).textContent = v2
      }

    }, 0.5);
    listerner = true;
}
console.log(document.location.href,document.cookie);
function printPage(){
  // let doc = new jsPDF();
  // doc.save()
  print();
}
// logout function
function logout(){
  let cname;
  let date = new Date();
  let output = document.cookie;
  console.log(cname = output.split(';'));
  console.log(output="expires="+date);
  console.log(document.cookie,cname[0]);
  window.location.href=("./index.html");
}
// console.log(JSON.parse(file.json));
let num = 1;
if (true) {
  console.log(num,!num);
}

function alertBox(alertMessage){

    let container = document.createElement('div');
    container.setAttribute('id','alertBoxContainer');
    container.setAttribute('style','position: absolute;max-width: 10%;min-width: 200px; border:1px solid white;padding: 2%;border-radius: 7px; top:50%;left:50%;transform: translate(-50%, -50%);background-color:#fff;box-shadow: 10px 5px 5px black; font-family: Lucida Sans;cursor:pointer');
    let p = document.createElement('p');
    p.setAttribute('id','alertp')
    p.setAttribute('style','margin:0px; padding: 3px;font-size:20px;')
    p.innerText=alertMessage;
    let textArea = document.createElement('textarea');
    textArea.setAttribute('style','border: none;width: 80%; height: 20px;border-bottom:1px solid black;resize: none')
    textArea.setAttribute('id','textarea')
    let okButton = document.createElement('button');
    okButton.setAttribute('value','ok');
    okButton.setAttribute('id','okButton');
    okButton.setAttribute('onclick','alertbox.reqd()');
    okButton.innerText="ok";
    okButton.setAttribute('style','border:none;padding: 5px;width: 40%;margin: 3%; height: 20%;border-radius: 5px; font-family: Lucida Sans')
    let canButton = document.createElement('button');
    canButton.setAttribute('value','cancel');
    canButton.setAttribute('id','canButton');
    canButton.setAttribute('id','canButton');
    canButton.innerText="cancel";
    canButton.setAttribute('style','border:none;padding: 5px;width: 40%;margin: 3%; height: 20%;border-radius: 5px; font-family: Lucida Sans')
    document.body.appendChild(container)
    container.append(p)
    container.append(textArea)
    container.append(okButton)
    container.append(canButton);
    let textValue;
    bool = document.getElementById('okButton').onclick = function(){
        console.log(textValue = document.getElementById('textarea').value);
        // localStorage.setItem("textValue",textValue)
        document.getElementById('alertBoxContainer').remove();
        textValue = bool();
        return textValue;
    }
     console.log(localStorage.getItem("textValue"),textValue);
     iframe.contentDocument
     return textValue
}