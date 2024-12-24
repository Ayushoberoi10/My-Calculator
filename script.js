const display = document.getElementById("display");
const buttons = document.querySelectorAll(".Boxes");
const historyList = document.getElementById("history-list");

let currentInput = "";

// Update the display
function updateDisplay(value) {
    currentInput += value;
    display.value = currentInput;
}

// Clear the calculator
function clearCalculator() {
    currentInput = "";
    display.value = "0";
}

// Evaluate the current expression
function evaluateExpression() {
    try {
        if (currentInput.includes("/0")) {
            throw new Error("Division by zero");
        }
        const result = eval(currentInput);
        display.value = result;
        currentInput = result.toString();
    } catch (error) {
        display.value = "Error";
        currentInput = "";
    }
}

// Handle advanced operations
function advancedOperation(type) {
    let result;
    try {
        switch (type) {
            case "sqrt":
                result = Math.sqrt(eval(currentInput));
                break;
            case "square":
                result = Math.pow(eval(currentInput), 2);
                break;
            case "percent":
                result = eval(currentInput) / 100;
                break;
            default:
                throw new Error("Invalid operation");
        }
        display.value = result;
        currentInput = result.toString();
    } catch {
        display.value = "Error";
    }
}

// Keyboard support
document.addEventListener("keydown", (event) => {
    const key = event.key;
    if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
        updateDisplay(key);
    } else if (key === "Enter") {
        evaluateExpression();
    } else if (key === "Backspace") {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput || "0";
    } else if (key === "c") {
        clearCalculator();
    }
});

// Add functionality to buttons
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (value === "C") {
            clearCalculator();
        } else if (value === "=") {
            evaluateExpression();
        } else if (["√", "x²", "%"].includes(value)) {
            advancedOperation(value === "√" ? "sqrt" : value === "x²" ? "square" : "percent");
        } else {
            updateDisplay(value);
        }
    });
});
