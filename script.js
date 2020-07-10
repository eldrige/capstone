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
// sync slider synchronises the range and the input[number]
xterAmtRange.addEventListener("input", syncSlider);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const xterAmt = xterAmtNumber.value;
  const password = generatePass(xterAmt);
  displayPassword.innerText = password;
  savePsw(password);
  const lists = document.querySelectorAll(".psw");
  savedPsw.addEventListener("click", copyDelete);
});

// functions

// function that syncs the number and the range input
function syncSlider(e) {
  const value = e.target.value;
  xterAmtRange.value = value;
  xterAmtNumber.value = value;
}
// function generating passwords based on the current number of desired xters
function generatePass(xterAmt) {
  const charCodes = asciiXters;
  const passwordSaver = [];
  for (let i = 0; i < xterAmt; i++) {
    const xter = charCodes[Math.floor(Math.random() * charCodes.length)];
    passwordSaver.push(String.fromCharCode(xter));
  }
  return passwordSaver.join("");
}
// function displaying dynamically created passwords
function savePsw(password) {
  let divList = document.createElement("div");
  divList.classList.add("psw");
  let liItem = document.createElement("li");
  liItem.innerText = password;

  let copybutton = document.createElement("button");
  copybutton.innerHTML = '<i class="fas fa-copy"></i>';
  copybutton.classList.add("copy-btn");
  divList.appendChild(copybutton); // add copy button to our current password div item

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add("trash-btn");
  divList.appendChild(deleteButton); //add delete button to our current password div item

  divList.appendChild(liItem);
  savedPsw.appendChild(divList);
}
// function that generates the arrau of ascii xters
function arrayFromLowToHigh(low, high) {
  let array = [];
  for (let i = low; i < high; i++) {
    array.push(i);
  }
  return array;
}
// function that takes care of deleting or copying the selected password
function copyDelete(e) {
  // delete password div
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const password = item.parentElement;
    password.remove();
  }

  // copy to clipcoard
  if (item.classList[0] === "copy-btn") {
    const password = item.parentElement;
    const passwordText = password.children[2];
    saveLocalPasswords(passwordText.innerText)
    localStorage.clear()
    const copyText = document.createElement("input");
    copyText.setAttribute("value", passwordText.innerText);
    copyText.select();
    document.execCommand("copy");
    alert("copied the password :" + " " + copyText.value);
  }
}
// this function saves the generateed passwords to local storage
function saveLocalPasswords(password) {
  // check if passwords already exists

  let passwords; //init array
  if (localStorage.getItem("passwords") === null) {
    passwords = []; //if not created yet , create it
  } else {
    passwords = JSON.parse(localStorage.getItem("passwords")); //convert stringified array, to normal array
  }
  passwords.push(password); //push current password
  localStorage.setItem("passwords", JSON.stringify(passwords)); // add the password to the password array in local storage
}
