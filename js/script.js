console.log("Calculator app");

const numbers = document.querySelectorAll('.number');
const upperDisplay = document.getElementById('upper-display-text');
const lowerDisplay = document.getElementById('lower-display-text');
const allClearButton = document.getElementById('all-clear');
const operators = document.querySelectorAll('.operator');
const equals = document.getElementById('equals');

numbers.forEach(node => node.addEventListener('click', clickNumber));
operators.forEach(node => node.addEventListener('click', clickOperator));
allClearButton.addEventListener('click', clear);

let operations = {
    current: null,
    operator: null,
    last: null,
}

let add = (a, b) => a + b;
let minus = (a, b) => a - b;
let divide = (a, b) => a / b;
let multiply = (a, b) => a * b;
let modulo = (a, b) => a % b;

function clickNumber() {
    let number = this.dataset.number;
    updateOperations('current', number);
    writeLower(number);
    console.log(operations.current);
}

function clickOperator() {
    let operator = this.dataset.operator;
    if (operations.current != null) {
        operations.last = operations.current;
        operations.operator = operator;
        operations.current = null;
        lowerDisplay.innerHTML = "0";
        writeUpper();
    }
    console.log(operations);
}

function clear() {
    lowerDisplay.innerHTML = "0";
    upperDisplay.innerHTML = "(empty)";
    for (let key in operations) { operations[key] = null; } // reset operations keys to starting NULL value
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