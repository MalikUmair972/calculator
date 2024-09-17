document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const history = document.getElementById('history');
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let fullExpression = '';

    function updateDisplay() {
        display.textContent = currentInput || '0';
        history.textContent = fullExpression;
    }

    window.appendNumber = function (number) {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
        updateDisplay();
    };

    window.appendOperator = function (op) {
        if (currentInput === '' && previousInput === '') return;

        if (operator !== '' && currentInput !== '') {
            calculate();
        }

        operator = op;
        if (currentInput !== '') {
            fullExpression += `${currentInput} ${operator} `;
            previousInput = currentInput;
            currentInput = '';
        } else {
            fullExpression = fullExpression.slice(0, -2) + ` ${operator} `;
        }

        updateDisplay();
    };

    window.calculateResult = function () {
        if (previousInput === '' || currentInput === '' || operator === '') return;

        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            case '%':
                result = prev % curr;
                break;
            default:
                return;
        }

        fullExpression += currentInput + ' =';
        currentInput = result.toString();
        operator = '';
        previousInput = '';
        updateDisplay();
        fullExpression = ''; // Reset fullExpression after displaying the result
    };

    window.clearDisplay = function () {
        currentInput = '';
        operator = '';
        previousInput = '';
        fullExpression = '';
        updateDisplay();
    };

    window.deleteLast = function () {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    };

    // Handle keyboard input
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        if (key >= '0' && key <= '9') {
            appendNumber(key);
        } else if (key === '.') {
            appendNumber('.');
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            appendOperator(key);
        } else if (key === 'Enter' || key === '=') {
            calculateResult();
        } else if (key === 'Backspace') {
            deleteLast();
        } else if (key === 'Escape') {
            clearDisplay();
        } 
    });
});
