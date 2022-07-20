console.log("Calculator app");

let operations = {
    current: null,
    operator: null,
    last: null,
    inProgress: null,
    allowDecimal: true,
}

function clickNumber() {
    let number = this.dataset.number;

    if (number === "0") {
        if (operations.current === "0") return;
        if (operations.operator && !operations.current) {
            updateOperations('current', number);
            lowerDisplay.textContent = operations.current;
            return writeUpper();
        }
        if (!operations.current) return;
    }

    if (operations.inProgress) { // Checks if last button pressed was an operator (this flag is set in very specific circumstances and only when needed...)
        updateOperations('current', number);
        lowerDisplay.textContent = operations.current;
        writeUpper();
        return operations.inProgress = null;
    }

    if (!operations.operator && operations.last) return;

    updateOperations('current', number);
    writeLower(number);
    console.log(operations.current);
}

function clickOperator() {
    let operator = this.dataset.operator;

    if (!operations.current && !operations.operator && !operations.last) {
        operations.operator = operator;
        operations.current = null;
        operations.last = "0";
        operations.inProgress;
        return writeUpper();
    }

    if (operations.current != null && operations.last === null) {
        operations.last = operations.current;
        operations.operator = operator;
        operations.current = null;
        operations.allowDecimal = true;
        lowerDisplay.textContent = "0";
        return writeUpper();
    }

    if (operations.last != null && operations.operator === null && operations.current === null) {
        operations.operator = operator;
        operations.allowDecimal = true;
        lowerDisplay.textContent = "0";
        return writeUpper();
    }

    if (operations.last != null && operations.operator != null && operations.current != null) {
        clickEquals();
        operations.operator = operator;
        operations.allowDecimal = true;
        return operations.inProgress = true;
    }

    if (operations.operator && !operations.current) { // when pressing 2 operators in succession
        operations.operator = operator;
        if (!operations.inProgress) return writeUpper();
    }

    console.log(operations);
}

function clickEquals() {
    if (!operations.operator || operations.inProgress === true) return; // If no operator in pipeline, do nothing

    if (operations.last && operations.operator != null) { // If operator is specified, run equation
        let answer = doOperation();
        console.log(answer);
        upperDisplay.textContent += ` ${operations.current} =`;
        lowerDisplay.textContent = answer;
        operations.current = null;
        operations.last = String(answer);
        operations.operator = null;
    }
}

function clickDecimal() {
    if (operations.allowDecimal === false) return;
    if (!operations.operator && operations.last) return;
    if (!operations.current && operations.inProgress === true) return;

    if (operations.current !== Math.floor(operations.current)) {
        operations.current = `${Math.floor(operations.current)}.`;
        lowerDisplay.textContent = operations.current;
        operations.allowDecimal = false;
    }
}

function clickClear() {
    if (!operations.current) return;

    if (operations.current.length === 1) {
        operations.current = null;
        return lowerDisplay.textContent = "0";
    };

    let numArray = Array.from(operations.current);

    if (numArray.length > 1) {
        numArray.splice(-1, 1);
        let newNumber = numArray.join('');
        console.log(newNumber);
        operations.current = newNumber;
        lowerDisplay.textContent = operations.current;
    }
}

function doOperation() {
    let operator = operations.operator;
    let a = Number(operations.last);
    let b = Number(operations.current);

    console.log(b);

    if (operations.current === null) { // If no operand value specified, assume "0" is the input (default)
        b = 0;
        operations.current = 0;
    }

    if (operator === "+") return a + b; // plus
    if (operator === "-") return a - b; // minus
    if (operator === "÷") return a / b; // divide
    if (operator === "x") return a * b; // multiply
    if (operator === "%") return a % b; // modulo
}

function allClear() {
    lowerDisplay.textContent = "0";
    upperDisplay.textContent = "(empty)";
    for (let key in operations) { operations[key] = null; } // Change operations object keys to "null" value
    console.log(operations);
}

function writeLower(string) {
    lowerDisplay.textContent === "0" ? lowerDisplay.textContent = string : lowerDisplay.textContent += string;
}

function writeUpper() {
    let number = operations.last;
    let operator = operations.operator;
    upperDisplay.textContent = `${number} ${operator}`;
}

function updateOperations(key, value) {
    if (key === 'current') operations[key] === null ? operations[key] = value : operations[key] += value;
}

const numbers = document.querySelectorAll('.number');
const upperDisplay = document.getElementById('upper-display-text');
const lowerDisplay = document.getElementById('lower-display-text');
const allClearBtn = document.getElementById('all-clear');
const operators = document.querySelectorAll('.operator');
const equals = document.getElementById('equals');
const decimal = document.getElementById('decimal');
const clearBtn = document.getElementById('clear');

numbers.forEach(node => node.addEventListener('click', clickNumber));
operators.forEach(node => node.addEventListener('click', clickOperator));
equals.addEventListener('click', clickEquals);
allClearBtn.addEventListener('click', allClear);
decimal.addEventListener('click', clickDecimal);
clearBtn.addEventListener('click', clickClear);