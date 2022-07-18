console.log("Calculator app");

const numbers = document.querySelectorAll('.number');
const upperDisplay = document.getElementById('upper-display-text');
const lowerDisplay = document.getElementById('lower-display-text');
const allClearButton = document.getElementById('all-clear');
const operators = document.querySelectorAll('.operator');
const equals = document.getElementById('equals');

numbers.forEach(node => node.addEventListener('click', clickNumber));
operators.forEach(node => node.addEventListener('click', clickOperator));
equals.addEventListener('click', clickEquals);
allClearButton.addEventListener('click', clear);

let operations = {
    current: null,
    operator: null,
    last: null,
    inProgress: false,
}

function clickNumber() {
    let number = this.dataset.number;

    if (operations.inProgress) {
        lowerDisplay.textContent = number;
        writeUpper();
        updateOperations('current', number);
        return operations.inProgress = false;
    }

    updateOperations('current', number);
    writeLower(number);
    console.log(operations.current);
}

function clickOperator() {
    let operator = this.dataset.operator;

    if (operations.current != null && operations.last === null) {
        operations.last = operations.current;
        operations.operator = operator;
        operations.current = null;
        lowerDisplay.innerHTML = "0";
        return writeUpper();
    }

    if (operations.last != null && operations.operator === null && operations.current === null) {
        operations.operator = operator;
        lowerDisplay.innerHTML = "0";
        return writeUpper();
    }

    if (operations.last != null && operations.operator != null && operations.current != null) {
        clickEquals();
        operations.operator = operator;
        operations.inProgress = true;
    }

    console.log(operations);
}

function clickEquals() {
    if (operations.last) {
        let answer = doOperation();
        console.log(answer);
        upperDisplay.innerHTML += ` ${operations.current} =`;
        lowerDisplay.innerHTML = answer;
        operations.current = null;
        operations.last = String(answer);
        operations.operator = null;
    }
}

function doOperation() {
    let operator = operations.operator;
    let a = Number(operations.last);
    let b = Number(operations.current);
    if (operator === "+") return a + b; // plus
    if (operator === "-") return a - b; // minus
    if (operator === "÷") return a / b; // divide
    if (operator === "x") return a * b; // multiply
    if (operator === "%") return a % b; // modulo
}

function clear() {
    lowerDisplay.innerHTML = "0";
    upperDisplay.innerHTML = "(empty)";
    for (let key in operations) { operations[key] = null; } // Change operations object keys to "null" value
    console.log(operations);
}

function writeLower(string) {
    lowerDisplay.innerHTML === "0" ? lowerDisplay.innerHTML = string : lowerDisplay.innerHTML += string;
}

function writeUpper() {
    let number = operations.last;
    let operator = operations.operator;
    upperDisplay.innerHTML = `${number} ${operator}`;
}

function updateOperations(key, value) {
    if (key === 'current') operations[key] === null ? operations[key] = value : operations[key] += value;
}