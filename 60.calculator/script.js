let buttons = document.querySelectorAll(".input-btn");
let display = document.getElementById("display");
let recent = document.getElementById("recent");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let erase = document.getElementById("erase");
let color = document.getElementById('color');
let container = document.querySelector('.container');
let equalPressed = false;

container.style.backgroundColor = color.value;

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (equalPressed) {
      equalPressed = false;
    }
    if (display.value.includes("Invalid")) {
      let removedInvalid = display.value.slice(13);
      display.value = removedInvalid;
    }
    display.value += btn.value;
  });
});
equal.addEventListener("click", () => {
  equalPressed = true;
  let inputValue = display.value;
  try {
    let solution = eval(inputValue);
    if (Number.isInteger(solution)) {
      display.value = solution;
      recent.innerText = `${inputValue} = ${solution}`;
    }
  } catch (err) {
    display.value = "Invalid input";
  }
});
clear.addEventListener("click", () => {
  display.value = "";
});
erase.addEventListener("click", () => {
  let removedValue = display.value.slice(0, display.value.length - 1);
  display.value = removedValue;
});
color.addEventListener('change', () => {
    container.style.background = color.value
})