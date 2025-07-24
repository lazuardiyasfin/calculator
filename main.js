const operators = ['+', '-', '*', '/'];

let firstOperand = '';
let currentOperator = '';
let secondOperand = '';

const display = document.querySelector('.display');
let lastInput = '';

document.querySelector(".button-container").addEventListener('click', (e) => {
    e.target.blur();
    if (e.target.id) handleInput(e.target.id);
});

window.addEventListener('keydown', (e) => {
    if (e.ctrlKey) return;
    if (e.key == '/') e.preventDefault(); // Prevent firefox from opening quick search
    handleInput(mapKey(e.key));
});

function handleInput(input) {
    if (!Number.isNaN(+input)) {
        if (display.textContent == '0' || lastInput == '=' || 
            operators.includes(lastInput)) {
            display.textContent = input;
        }
        else {
            display.textContent += input;
        }

        if (lastInput == '=') {
            clearState();
        }
        
        updateOperands();
    }
    else if (operators.includes(input)) {
        if (lastInput == 'n') {
            currentOperator = '';
            secondOperand = '';
        }

        if (secondOperand != '') {
            evaluateExpression();
        }

        if (!Number.isFinite(+display.textContent)) {
            display.textContent = '0';
            firstOperand = display.textContent;
        }

        currentOperator = input;
    }
    else if (input == 'ac') {
        clearState();
        display.textContent = '0';
    }
    else if (input == 'ce') {
        if (lastInput == '=') {
            clearState();
        }
        display.textContent = '0';

        updateOperands();
    }
    else if (input == '=') {
        if (operators.includes(lastInput)) {
            secondOperand = firstOperand;
        }

        if (currentOperator != '') {
            evaluateExpression();
        }
    }
    else if (input == '.') {
        if (lastInput == '=') {
            clearState();
            display.textContent = '0';
        }

        if (operators.includes(lastInput)) {
            display.textContent = '0.';
        }

        if (!display.textContent.includes('.')) {
            display.textContent += '.';
        }

        updateOperands();
    }
    else if (input == 'b') {
        if (lastInput == '=') {
            clearState();
            display.textContent = '0';
        }
        else if (display.textContent.length > 1) {
            display.textContent = display.textContent.slice(0, -1);
        }
        else {
            display.textContent = '0';
        }

        updateOperands();
    }
    else if (input == 'n') {
        let negatedValue = -(+display.textContent);

        display.textContent = negatedValue;

        if (lastInput == '=') {
            firstOperand = display.textContent;
        }
        else {
            updateOperands();
        }
    }
    else {
        return;
    }

    lastInput = input;
}

function mapKey(key) {
    switch (key) {
        case 'Backspace': return 'b';
        case 'Enter': return '=';
        case 'Escape': return 'ac';
        case 'Delete': return 'ce';
        default: return key;
    }
}

function updateOperands() {
    if (currentOperator == '' ) {
        firstOperand = display.textContent;
    }
    else {
        secondOperand = display.textContent;
    }
}

function evaluateExpression() {
    let result = operate(firstOperand, secondOperand, currentOperator);

    if (!Number.isFinite(result)) {
        display.textContent = result;
        clearState();
        return;
    }

    if (Math.abs(result) >= 10 ** 9 || Math.abs(result) <= 10 ** (-3)) {
        result = result.toExponential(6);
    }
    else {
        result = parseFloat(result.toPrecision(11));
    }

    display.textContent = result;

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