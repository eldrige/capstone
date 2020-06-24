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
const savedPsw = document.querySelector('.saved-psw')

// event listeners
xterAmtNumber.addEventListener("input", syncSlider);
xterAmtRange.addEventListener("input", syncSlider);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const xterAmt = xterAmtNumber.value;
  const password = generatePass(xterAmt);
  displayPassword.innerText = password;
  savePsw(password)
  // generateBtn.classList.add('disappear')
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
function savePsw(password){
  let ulList = document.createElement('ul')
  let liItem = document.createElement('li')
  liItem.innerText = password
  ulList.appendChild(liItem)
  savedPsw.appendChild(ulList)
}

function arrayFromLowToHigh(low, high) {
  let array = [];
  for (let i = low; i < high; i++) {
    array.push(i);
  }
  return array;
}

