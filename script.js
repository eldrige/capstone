
document.addEventListener("DOMContentLoaded", () => {
  // node elements
  const xterAmtRange = document.getElementById("range");
  const xterAmtNumber = document.getElementById("number");
  const generateBtn = document.getElementById("generate");
  const form = document.getElementById("form");
  const displayPassword = document.querySelector(".password-display");
  const asciiXters = arrayFromLowToHigh(97, 122)
    .concat(arrayFromLowToHigh(48, 57))
    .concat(arrayFromLowToHigh(33, 47))
    .concat(arrayFromLowToHigh(58, 64))
    .concat(arrayFromLowToHigh(91, 96))
    .concat(arrayFromLowToHigh(123, 126));
  const savedPsw = document.querySelector(".saved-psw");

  // event listeners
  xterAmtNumber.addEventListener("input", syncSlider);
  xterAmtRange.addEventListener("input", syncSlider);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const xterAmt = xterAmtNumber.value;
    const password = generatePass(xterAmt);
    displayPassword.innerText = password;
    savePsw(password);
    const lists = document.querySelectorAll(".psw");
   
      // lists.forEach((list) => {
      //   list.children[1].addEventListener("click", (e) => {
      //     // on each of the passwords, when the delete button gets clicked , we remove the entired div
      //     const target = e.target;
      //     const targetParent = target.parentElement; // target the parent elt to suppress the whole div
      //     targetParent.remove();
      //   });
      // });
    
      lists.forEach((list) => {
        list.children[0].addEventListener("click", (e) => {
          const target = e.target.parentElement.children[2]
          let copyText = document.createElement('input')
          copyText.value = target.innerText
          copyText.select()
          copyText.setSelectionRange(0,99999)
          document.execCommand("copy")
          alert("Copied the text" + copyText.value)
        });
      });
    
  });

  // functions
  function syncSlider(e) {
    const value = e.target.value;
    xterAmtRange.value = value;
    xterAmtNumber.value = value;
  }

  function generatePass(xterAmt) {
    const charCodes = asciiXters;
    const passwordSaver = [];
    for (let i = 0; i < xterAmt; i++) {
      const xter = charCodes[Math.floor(Math.random() * charCodes.length)];
      passwordSaver.push(String.fromCharCode(xter));
    }
    return passwordSaver.join("");
  }

  function savePsw(password) {
    let divList = document.createElement("div");
    divList.classList.add("psw");
    let liItem = document.createElement("li");
    liItem.innerText = password;

    let copybutton = document.createElement("button");
    copybutton.innerHTML = '<i class="fas fa-copy"></i>';
    copybutton.classList.add("copy-btn");
    divList.appendChild(copybutton); // add copy button to our current password li item

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add("trash-btn");
    divList.appendChild(deleteButton); //add delete button to our current password li item

    divList.appendChild(liItem);
    savedPsw.appendChild(divList);
  }

  function arrayFromLowToHigh(low, high) {
    let array = [];
    for (let i = low; i < high; i++) {
      array.push(i);
    }
    return array;
  }
});
