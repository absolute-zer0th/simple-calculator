const NUMBERS = "0123456789";
const OPERATORS = "+-*/";

const calc = document.querySelector("#calculator");
const display = document.querySelector("#display");
const numpad = document.querySelector("#numpad");

// Global state variables tracking the math engine
let a;
let o;
let b;
let isResultDisplayed = false;
let shouldResetDisplay = false;

/**
 * Executes core mathematical operations.
 * Returns a number or an error string for invalid calculations.
 */
function operate(a, o, b) {
    switch (o) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            if (b === 0) return "Nice try.";
            return a / b;
        default:
            return NaN;
    }
}

// Global delegated event listener for all numpad clicks
numpad.addEventListener("click", (event) => {
    // Safety guard: ignore clicks that aren't on actual buttons
    if (event.target.tagName !== "BUTTON") return;
    const buttonText = event.target.textContent;

    // -------------------------------------------------------------------------
    // 1. CLEAR BUTTON LOGIC
    // -------------------------------------------------------------------------
    if (buttonText === "Clear") {
        display.value = "0";
        a = undefined;
        o = undefined;
        b = undefined;
        isResultDisplayed = false;
        shouldResetDisplay = false;
        return;
    }

    // -------------------------------------------------------------------------
    // 2. EQUALS BUTTON LOGIC
    // -------------------------------------------------------------------------
    if (buttonText === "=") {
        // If 'b' isn't stored yet, grab whatever is on the screen
        if (b === undefined) b = +display.value;
        const result = operate(a, o, b);

        if (typeof result === "string") {
            // Display error message and hard-reset memory
            display.value = result;
            a = undefined;
            o = undefined;
            b = undefined;
        } else {
            // Display properly formatted numerical result
            display.value = parseFloat(result.toPrecision(9));
        }

        isResultDisplayed = true;
        b = undefined; // Clear 'b' to allow consecutive equals spams
        return;
    }

    // -------------------------------------------------------------------------
    // 3. OPERATOR BUTTON LOGIC (+, -, *, /)
    // -------------------------------------------------------------------------
    if (OPERATORS.includes(buttonText)) {
        if (a === undefined) {
            // First operator lock-in
            a = +display.value;
        } else {
            // Chaining math evaluation (e.g., 12 + 7 -)
            if (b === undefined) b = +display.value;
            const result = operate(a, o, b);

            if (typeof result === "string") {
                // If division-by-zero occurs mid-chain, display error and fully exit
                display.value = result;
                a = undefined;
                o = undefined;
                b = undefined;
                return;
            }

            // Hand-off intermediate result back to 'a'
            display.value = parseFloat(result.toPrecision(9));
            a = result;
            b = undefined;
        }

        o = buttonText; // Set new operator for next sequence
        shouldResetDisplay = true; // Flag screen to clear on next digit press
        return;
    }

    // -------------------------------------------------------------------------
    // 4. NUMBER BUTTON LOGIC (0-9)
    // -------------------------------------------------------------------------
    if (NUMBERS.includes(buttonText)) {
        // Switch A: User starts typing a fresh sequence right after clicking '='
        if (isResultDisplayed) {
            a = undefined;
            o = undefined;
            b = undefined;
            display.value = buttonText;
            isResultDisplayed = false;
            return;
        }

        // Switch B: User starts typing 'b' right after selecting an operator
        if (shouldResetDisplay) {
            display.value = buttonText;
            shouldResetDisplay = false;
            return;
        }

        // Switch C: Overwrite initial or clear-state zero string
        if (display.value === "0") {
            display.value = buttonText;
            return;
        }

        // Standard Appending Fallback: Typing mid-sequence digits (e.g., the '2' in 12)
        display.value += buttonText;
    }
});
