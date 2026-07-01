const calc = document.querySelector("#calculator");
const disp = document.querySelector("#display");
const cont = document.querySelector("#container");

function operate(
  a = prompt("Enter the first number:"),
  o = prompt("Enter the operator (+, -, *, /):"),
  b = prompt("Enter the second number:"),
) {
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
