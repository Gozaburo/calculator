// Operators
let dividedByZero = false;
function add(a,b) { 
    return Number(a) + Number(b);
}

function subtract(a,b) {
    return Number(a) - Number(b);
}

function multiply(a,b) {
    return Number(a) * Number(b);
}

function divide(a,b) {
    try {
        if (b === '0') {
            throw new Error('Error')
        }
        return Number(a) / Number(b);
    } 
    catch (e) {
        console.error(e);
        dividedByZero = true;
        return 'Error';
    }
}
function operate(operator,a,b) {
    if (operator === '+') {
        return add(a,b);
    }
    else if (operator === '-') {
        return subtract(a,b);
    }
    else if (operator === '×') {
        return multiply(a,b);
    }
    else {
        return divide(a,b);
    }
}
const operations = [];
let lastUsedOperator = "";
let justPressedOperator = false;
let justPressedEquals = false;
let displayHasData = false;
let displayValue = "0";
let decimal = document.querySelector('.decimal');
decimal.addEventListener('click', () => {
    if (displayValue.includes('.') || dividedByZero) {
        return;
    }
    displayValue = displayValue += ".";
    document.querySelector('#display').textContent = displayValue;
});
let percent = document.querySelector('.percent');
percent.addEventListener('click', () => {
    if (!displayHasData || dividedByZero) {
        return;
    }
    let currDisplay = document.querySelector('#display');
    displayValue = Number(currDisplay.textContent) / 100;
    currDisplay.textContent = displayValue;
});
let sign = document.querySelector('.sign');
sign.addEventListener('click', () => {
    if (!displayHasData || dividedByZero) {
        return;
    }
    let currDisplay = document.querySelector('#display');
    currDisplay.textContent = (Number(currDisplay.textContent) * -1).toString();
    displayValue = currDisplay.textContent;
});
const operators = document.querySelectorAll(".operator");
let clear = document.querySelector(".clear");
clear.addEventListener('click', () => {
    operations.length = 0;
    lastUsedOperator = "";
    justPressedEquals = false;
    justPressedOperator = false;
    displayHasData = false;
    displayValue = "0";
    dividedByZero = false;
    operators.forEach( (operator) => {
        operator.style.backgroundColor = '#a73a00';
    });
    document.querySelector('#display').textContent = displayValue;
});
clear.style.backgroundColor = '#007a13';
let digitButtons = document.querySelectorAll(".digit");
digitButtons.forEach( (button) => {
    button.addEventListener("click", () => {
        if (displayValue.length > 12 || dividedByZero) {
            return;
        }
        if (displayValue === "0") {
            displayValue = button.textContent;
        }
        else {
            displayValue += button.textContent;
        }
        const display = document.querySelector("#display")
        display.textContent = displayValue;
        displayHasData = true;
        justPressedOperator = false;
    });
});
operators.forEach( (operator) => {
    if (dividedByZero) {
        return;
    }
    operator.style.backgroundColor = '#a73a00';
    operator.addEventListener("click", () => {
        const allOperators = document.querySelectorAll('.operator');
        allOperators.forEach( (op) => {
            op.style.backgroundColor = '#a73a00';
            operator.style.backgroundColor = '#595656';
        });
        if (justPressedOperator) { // Checking if user just pressed an operator, if they did, change the operator
            operations[operations.length - 1] = operator.textContent;
            lastUsedOperator = operator.textContent;
            return;
        }
        const display = document.querySelector("#display");
        const currOperator = operator.textContent;
        if (!justPressedEquals) {
            operations.push(displayValue);
        }
        if (['+','-'].includes(lastUsedOperator) && ['+','-'].includes(currOperator)) {
            const result = operate(operations[operations.length-2],operations[operations.length-3],operations[operations.length-1]);
            operations.pop();
            operations.pop();
            operations.pop();
            let trueResult = parseFloat(result.toFixed(12)).toString();
            if (Number(trueResult) > 1000000000) {
                trueResult = Number(trueResult).toExponential(8).toString();
            }
            operations.push(trueResult);
            display.textContent = trueResult;
        }
        else if (['+','-'].includes(lastUsedOperator) && ['×','÷'].includes(currOperator)) {
            display.textContent = operations[operations.length - 1];
        }
        else if (['×','÷'].includes(lastUsedOperator) && ['+','-'].includes(currOperator)) {
            const result = operate(operations[operations.length-2],operations[operations.length-3],operations[operations.length-1]);
            operations.pop();
            operations.pop();
            operations.pop();
            let trueResult = parseFloat(result.toFixed(12)).toString();
            if (Number(trueResult) > 1000000000) {
                trueResult = Number(trueResult).toExponential(8).toString();
            }
            operations.push(trueResult);
            display.textContent = trueResult;
        }
        else if (['×','÷'].includes(lastUsedOperator) && ['×','÷'].includes(currOperator)) {
            const result = operate(operations[operations.length-2],operations[operations.length-3],operations[operations.length-1]);
            operations.pop();
            operations.pop();
            operations.pop();
            let trueResult = parseFloat(result.toFixed(12)).toString();
            if (Number(trueResult) > 1000000000) {
                trueResult = Number(trueResult).toExponential(8).toString();
            }
            operations.push(trueResult);
            display.textContent = trueResult;
        }
        operations.push(currOperator);
        displayValue = "0";
        justPressedOperator = true;
        lastUsedOperator = currOperator;
        justPressedEquals = false;
        displayHasData = false;
    });
});
const equals = document.querySelector(".equals");
equals.addEventListener('click', () => {
    operators.forEach( (operator) => {
        operator.style.backgroundColor = '#a73a00';
    });
    if (operations.length <= 1 || dividedByZero) {
        return;
    }
    if (operations.length === 2 && !displayHasData) {
        operations.pop();
    }
    else if (operations.length === 2 && displayHasData) {
        operations.push(displayValue);
        const result = operate(operations[operations.length - 2], operations[operations.length - 3], operations[operations.length-1]);
        if (result === 'Error') {
            document.querySelector("#display").textContent = "Cannot divide 0";
            return;
        }
        operations.pop();
        operations.pop();
        operations.pop();
        let trueResult = parseFloat(result.toFixed(12)).toString();
        if (Number(trueResult) > 1000000000) {
            trueResult = Number(trueResult).toExponential(8).toString();
        }
        operations.push(trueResult);
        const display = document.querySelector("#display");
        display.textContent = operations[0];
        displayValue = operations[0];
    }
    else if (operations.length === 4 && displayHasData) {
        let userEnteredOperator = operations[operations.length -1];
        let firstOperator = operations[operations.length - 3];
        if (['×','÷'].includes(userEnteredOperator) && ['+','-'].includes(firstOperator)) {
            operations.push(displayValue);
            const firstRes = operate(operations[operations.length - 2], operations[operations.length - 3], operations[operations.length - 1]);
            if (firstRes === 'Error') {
                document.querySelector("#display").textContent = "Cannot divide 0";
                return;
            } 
            operations.pop();
            operations.pop();
            operations.pop();
            operations.push(parseFloat(firstRes.toFixed(12)).toString());
            const secondRes = operate(operations[operations.length - 2], operations[operations.length - 3], operations[operations.length - 1]);
            if (secondRes === 'Error') {
                document.querySelector("#display").textContent = "Cannot divide 0";
                return;
            }
            operations.pop();
            operations.pop();
            operations.pop();
            let trueResult = parseFloat(secondRes.toFixed(12)).toString();
            if (Number(trueResult) > 1000000000) {
                trueResult = Number(trueResult).toExponential(8).toString();
            }
            operations.push(trueResult);
            const display = document.querySelector("#display");
            display.textContent = operations[0];
            displayValue = operations[0];
        }
    }
    lastUsedOperator = "";
    justPressedOperator = false;
    justPressedEquals = true;
});