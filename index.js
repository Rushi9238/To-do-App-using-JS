const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const ulEle = document.getElementById("ulEle");
const itemCount = document.getElementById("itemCount");
const btnDiv = document.querySelector(".btnDiv");
const clearButton=document.querySelector(".clear")
// handel by click on Button
addBtn.addEventListener("click", addItem, false);

// Hnadel By enter Key
inputBox.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
   
    event.preventDefault();
    addItem();
  }
});

let countItem = 0;

function addItem() {
  if (inputBox.value && inputBox.value.length > 2) {
    // Create A Date Object Instance
    const date = new Date();
    countItem++;
    console.log("hello", inputBox.value);
    const textEnter = inputBox.value.trim();
    let liElement = document.createElement("li");
    liElement.innerHTML = `
    <div class="cardDiv">
    <span>${textEnter}</span>
    <div class="btn-group">
      <button class="done">✔</button>
      <button class="delete">✖</button>
      <button class="edit">✏️</button>
    </div>
  </div>
  <div class="p-date">
    <span>Created: </span>
    <p class="date">${date.toDateString()} - ${date.toLocaleTimeString()}</p>
  </div>
    `;
    ulEle.append(liElement);
    btnDiv.classList.add("showBtnDiv");
    let deleteButton = liElement.querySelector(".delete");
    let doneButton = liElement.querySelector(".done");
    let editButton = liElement.querySelector(".edit");
    let spanElement = liElement.querySelector("span");
    let spanText = liElement.querySelector("span").innerText;
    let divElement = liElement.querySelector(".cardDiv");
    // Internal Event Handeler
    // delete TO-do
    deleteButton.addEventListener(
      "click",
      function () {
        countItem--;
        countCallFn();
        liElement.outerHTML = "";
        if (!ulEle.innerText) {
          btnDiv.classList.remove("showBtnDiv");
        }
      },
      false
    );

    // Edit To-do
    editButton.addEventListener(
      "click",
      function () {
      
        if (liElement.classList != "font") {
          // Bind the span element to the keydown action

          spanElement.addEventListener("keydown", function (event) {
            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
              // Cancel the default action of "Enter" Key Because it inserts a new line
              event.preventDefault();
              if (
                spanElement.innerText.trim().replace(/&nbsp;/g, "") != "" &&
                spanElement.innerText.trim().replace(/&nbsp;/g, "").length <= 50
              ) {
                spanElement.innerHTML = spanElement.innerHTML
                  .trim()
                  .replace(/&nbsp;/g, "");

                if (
                  spanElement.innerText.trim().replace(/&nbsp;/g, "") !=
                  spanText.trim().replace(/&nbsp;/g, "")
                ) {
                  let editSpanElement = document.createElement("span");
                  // editSpanElement.innerHTML = "Edited";
                  // editSpanElement.classList.add("edited");
                  divElement.after(editSpanElement);
                }
                spanElement.setAttribute("contenteditable", false);
                spanElement.classList.remove('borderSpan')
              }
            }
          });

          if (spanElement.getAttribute("contenteditable") == "true") {
            spanElement.classList.remove('borderSpan')
            if (
              spanElement.innerText.trim().replace(/&nbsp;/g, "") != "" &&
              spanElement.innerText.trim().replace(/&nbsp;/g, "").length <= 50
            ) {
              spanElement.innerHTML = spanElement.innerHTML
                .trim()
                .replace(/&nbsp;/g, "");

              if (
                spanElement.innerText.trim().replace(/&nbsp;/g, "") !=
                spanText.trim().replace(/&nbsp;/g, "")
              ) {
                let editSpanElement = document.createElement("span");
                // editSpanElement.innerHTML = "Edited";
                // editSpanElement.classList.add("edited");
                divElement.after(editSpanElement);
              }
              spanElement.setAttribute("contenteditable", false);
            }
          } else {
            spanElement.setAttribute("contenteditable", true);
            spanElement.classList.add('borderSpan')
          }
        }
      },
      
    );

    // done To-do
    doneButton.addEventListener(
      "click",
      function () {
        if (liElement.classList != "font") {
         
          if (
            spanElement.innerText.trim().replace(/&nbsp;/g, "") != "" &&
            spanElement.innerText.trim().replace(/&nbsp;/g, "").length <= 50
          ) {
            spanElement.innerHTML = spanElement.innerHTML
              .trim()
              .replace(/&nbsp;/g, "");

            if (
              spanElement.innerText.trim().replace(/&nbsp;/g, "") !=
              spanText.trim().replace(/&nbsp;/g, "")
            ) {
              let editSpanElement = document.createElement("span");
              // editSpanElement.innerHTML = "Edited";
              // editSpanElement.classList.add("edited");
              divElement.after(editSpanElement);
            }
           
            const newDate = new Date();
            // Create a new div element
            let divDoneElement = document.createElement("div");

            let content = `
            <div class="done-date">
              <span>Done: </span>
              <p class="new-date">${newDate.toDateString()} - ${newDate.toLocaleTimeString()}</p>
            </div>
            `;

            divDoneElement.innerHTML = content;
            
            // editButton.parentNode.removeChild(editButton);
            // doneButton.parentNode.removeChild(doneButton);
            liElement.append(divDoneElement);
           
            liElement.classList.add("font");
      
            spanElement.setAttribute("contenteditable", false);
          }
        }
      },
      false
    );
    inputBox.value = "";
    
   countCallFn();
  } else {
    inputBox.value = "";
  }
}

clearButton.addEventListener(
  "click",
  function () {
    ulEle.innerHTML = "";
    inputBox.value = "";
    countItem = 0;
    btnDiv.classList.remove("showBtnDiv");
  },
  false
);

function countCallFn(){
  itemCount.innerHTML = `
  ${countItem} items left
       `;
}