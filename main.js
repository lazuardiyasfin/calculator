let firstOperand = '';
let currentOperator = '';
let secondOperand = '';

const display = document.querySelector('.display');
let lastInput = '';

document.querySelector(".button-container").addEventListener('click', (e) => handleInput(e.target.id));
document.addEventListener('keydown', (e) => {
    if (e.key == '/') e.preventDefault(); // Prevent firefox from opening quick search
    handleInput(mapKey(e.key));
});

function handleInput(input) {
    if (!Number.isNaN(+input)) {
        if (display.textContent == '0' || ['+', '-', '*', '/', '='].includes(lastInput)) {
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
    else if (['+', '-', '*', '/'].includes(input)) {
        if (secondOperand != '') {
            evaluateExpression();
        }

        currentOperator = input;
    }
    else if (input == 'ac') {
        clearState();
        display.textContent = '0';
    }
    else if (input == 'ce') {
        display.textContent = '0';

        if (lastInput == '=') return;

        updateOperands();
    }
    else if (input == '=' || input == 'Enter') {
        if (['+', '-', '*', '/'].includes(lastInput)) {
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

        if (!display.textContent.includes('.')) {
            display.textContent += '.';
        }
    }
    else if (input == 'b' || input == 'Backspace') {
        if (display.textContent.length > 1) {
            display.textContent = display.textContent.slice(0, -1);
        }
        else {
            display.textContent = 0;
        }

        updateOperands();
    }
    else if (input == '+/-') {
        let negatedValue = -(+display.textContent);

        display.textContent = negatedValue;

        updateOperands();
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