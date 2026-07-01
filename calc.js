const NUMBERS = "0123456789";
const OPERATORS = "+-*/";

const calc = document.querySelector("#calculator");
const display = document.querySelector("#display");
const numpad = document.querySelector("#numpad");

// globals
let a;
let o;
let b;

// calc logic
function operate(a, o, b) {
    switch (o) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return a / b;
        default:
            return NaN;
    }
}

// event listener on numpad
numpad.addEventListener("click", (event) => {
    // only register the click if it's on a button
    if (event.target.tagName !== "BUTTON") return;
    const buttonText = event.target.textContent;

    // only print button text to display if it's a number
    if (NUMBERS.includes(buttonText)) {
        if (display.value === "0" || OPERATORS.includes(display.value)) {
            display.value = "";
            display.value += buttonText;
        } else {
            display.value += buttonText;
        }

        // register a value first then print operator to display
    } else if (OPERATORS.includes(buttonText)) {
        o = buttonText;
        if (a === undefined) {
            a = +display.value;
        }
        display.value = "";
        display.value += buttonText;

        // equals function
    } else if (buttonText === "=") {
        if (b === undefined) {
            b = +display.value;
        }
        if (a !== undefined && b !== undefined && o !== undefined) {
            display.value = operate(a, o, b);
        }

        // clear function
    } else if (buttonText === "Clear") {
        display.value = "0";
    }
});
