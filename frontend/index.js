import { backend } from 'declarations/backend';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentValue = '';
let operator = '';
let previousValue = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value >= '0' && value <= '9' || value === '.') {
            currentValue += value;
            updateDisplay();
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentValue !== '') {
                if (previousValue !== '') {
                    calculate();
                }
                previousValue = currentValue;
                currentValue = '';
                operator = value;
            }
        } else if (value === '=') {
            if (currentValue !== '' && previousValue !== '') {
                calculate();
            }
        } else if (value === 'C') {
            clear();
        }
    });
});

function updateDisplay() {
    display.value = currentValue;
}

function clear() {
    currentValue = '';
    operator = '';
    previousValue = '';
    updateDisplay();
}

async function calculate() {
    const num1 = parseFloat(previousValue);
    const num2 = parseFloat(currentValue);
    let result;

    try {
        switch (operator) {
            case '+':
                result = await backend.add(num1, num2);
                break;
            case '-':
                result = await backend.subtract(num1, num2);
                break;
            case '*':
                result = await backend.multiply(num1, num2);
                break;
            case '/':
                const divisionResult = await backend.divide(num1, num2);
                if (divisionResult === null) {
                    throw new Error('Division by zero');
                }
                result = divisionResult;
                break;
        }

        currentValue = result.toString();
        operator = '';
        previousValue = '';
        updateDisplay();
    } catch (error) {
        currentValue = 'Error';
        updateDisplay();
        setTimeout(clear, 2000);
    }
}
