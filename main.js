let firstOperand = '';
let currentOperator = '';
let secondOperand = '';

const display = document.querySelector('.display');
let lastButtonId = '';

document.querySelector(".button-container").addEventListener('click', handleButtonClick);

function handleButtonClick(e) {
    let buttonId = e.target.id;

    if (!buttonId) {
        return;
    }

    if (!Number.isNaN(+buttonId)) {
        if (display.textContent == '0' || ['+', '-', '*', '/', '='].includes(lastButtonId)) {
            display.textContent = buttonId;
            shouldResetDisplay = false;
        }
        else {
            display.textContent += buttonId;
        }

        if (lastButtonId == '=') {
            clearState();
        }
        
        if (currentOperator == '' ) {
            firstOperand = display.textContent;
        }
        else {
            secondOperand = display.textContent;
        }
    }
    else if (buttonId == 'ac') {
        clearState();
        display.textContent = '0';
    }
    else if (buttonId == 'ce') {
        display.textContent = '0';

        if (lastButtonId == '=') return;

        if (currentOperator == '' ) {
            firstOperand = display.textContent;
        }
        else {
            secondOperand = display.textContent;
        }
    }
    else if (buttonId == '=') {
        if (['+', '-', '*', '/'].includes(lastButtonId)) {
            secondOperand = firstOperand;
        }

        if (currentOperator != '') {
            evaluateExpression();
        }
    }
    else if (buttonId == '.') {
        if (lastButtonId == '=') {
            clearState();
            display.textContent = '0';
        }

        if (!display.textContent.includes('.')) {
            display.textContent += '.';
        }
    }
    else if (buttonId == 'b') {
        if (display.textContent.length > 1) {
            display.textContent = display.textContent.slice(0, -1);
        }
        else {
            display.textContent = 0;
        }

        if (currentOperator == '' ) {
            firstOperand = display.textContent;
        }
        else {
            secondOperand = display.textContent;
        }
    }
    else if (buttonId == '+/-') {
        let negatedValue = -(+display.textContent);

        display.textContent = negatedValue;

        if (currentOperator == '' ) {
            firstOperand = display.textContent;
        }
        else {
            secondOperand = display.textContent;
        }
    }
    else {
        if (secondOperand != '') {
            evaluateExpression();
        }

        currentOperator = buttonId;
    }

    lastButtonId = buttonId;

    console.log("firstOperand: " + firstOperand);
    console.log("currentOperator: " + currentOperator);
    console.log("secondOperand: " + secondOperand);
    console.log("lastButtonId: " + lastButtonId);
}

function evaluateExpression() {
    let result = operate(firstOperand, secondOperand, currentOperator);

    if (result.toString().length > 7) {
        result = parseFloat(result).toExponential(6);
    }

    display.textContent = result;

    if (result == Infinity) {
        clearState();
        return;
    }

    firstOperand = display.textContent;
}

function clearState() {
    firstOperand = '';
    currentOperator = '';
    secondOperand = '';
}

function operate(a, b, operator) {
    a = Number(a);
    b = Number(b);
 
    let result = 0;

    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
        default:
            break;
    }

    return result;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}