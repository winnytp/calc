console.log("Calculator app");

const numbers = document.querySelectorAll('.number');
const lowerDisplay = document.getElementById('lower-display-text');
const allClearButton = document.getElementById('all-clear');

numbers.forEach(node => node.addEventListener('click', clickNumber));
allClearButton.addEventListener('click', clear);

let operations = {
    current: null,
    operator: null,
    last: null,
}

function clickNumber() {
    let number = this.dataset.number;
    updateOperations('current', number);
    writeLower(number);
    console.log(operations.current);
}

function clear() {
    lowerDisplay.innerHTML = '0';
    for (let key in operations) { operations[key] = null; } // reset operations keys to starting NULL value
}

function writeLower(string) {
    if (lowerDisplay.innerHTML === "0") return lowerDisplay.innerHTML = string;
    lowerDisplay.innerHTML += string;
}

function updateOperations(key, value) {
    if (key === 'current') operations[key] === null ? operations[key] = value : operations[key] += value;
}