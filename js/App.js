
// input
window.addEventListener('keydown', handleKeyDown);

function handleKeyDown(e) {

    let letter = e.key.toLowerCase();

    if (letter === 'enter') {
        if (currentAttempt.length < 5) {
            return alert('need more letters');
        }
        else {
            history.push(currentAttempt);
            currentAttempt = '';
        }

    }

    else if (letter === 'backspace') {
        currentAttempt = currentAttempt.slice(0, currentAttempt.length - 1)
    }

    else if (/^[a-z]$/.test(letter)) {
        if (currentAttempt.length < 5) {
            currentAttempt += letter;
        }
    }

    updateGrid();
}


// Word List 
let wordList = [
    'patio',
    'piano',
    'horse',
    'hello',
    'water',
    'pizza',
    'sushi',
    'crabs',

];

// select a random word of wordlist
let randomIndex = Math.floor(Math.random() * wordList.length);
let secret = wordList[randomIndex];

// The word who usser ACTUALLY introduce
let currentAttempt = ''
//the words who usser introduce
let history = [];

let grid = document.querySelector('#grid');
let keyboard = document.querySelector('#keyboard');

buildGrid();
buildKeyboard();
updateGrid();

// This create a Row and Files (Columns)
function buildGrid() {
    for (let i = 0; i < 6; i++) {
        let row = document.createElement('div')
        for (let j = 0; j < 5; j++) {
            let cell = document.createElement('div')
            cell.className = 'cell';
            cell.textContent = '';
            row.appendChild(cell)
        }
        grid.appendChild(row)
    }
}


function updateGrid() {
    let row = grid.firstChild // First row
    for (let attempt of history) {
        drawAttempt(row, attempt, false)
        row = row.nextSibling // Next row 
    }
    drawAttempt(row, currentAttempt, true)
}

function drawAttempt(row, attempt, isCurrent) {
    for (let i = 0; i < 5; i++) {
        let cell = row.children[i]
        if (attempt[i] !== undefined) {
            cell.textContent = attempt[i] //Put the word attempt in the cell
        } else {
            // The way that only makes the CSS not destroy the document
            cell.innerHTML = '<div style = "opacity:0">X</div>'
        }
        if (isCurrent) {
            cell.style.backgroundColor = '#000000 ';
        } else {
            cell.style.backgroundColor = getBgColor(attempt, i) //This function put the color in the cell
        }
    }
}

// function change color of the Grid
function getBgColor(attempt, i) {
    let correctLatter = secret[i];
    let attemptLatter = attempt[i];

    if (attemptLatter === undefined) {
        return '#000000 '; // Black
    }

    else if (secret.indexOf(attemptLatter) === -1) //If the letter of secret word doesnt find the letter of the attempt 
    {
        return 'gray'
    }

    else if (correctLatter === attemptLatter) {
        return '#6AAA64'; //green
    }

    else {
        return '#C9B458'; // yellow
    }

}


function buildKeyboard() {

    buildKeyboardRow('qwertyuiop', false);
    buildKeyboardRow('asdfghjkl', false);
    buildKeyboardRow('zxcvbnm', true);

}

function buildKeyboardRow (letters) {

    let row = document.createElement('div')
    for (let letter of letters){
        let button = document.createElement('button');
        button.className = 'buttonKeyboard';
        button.textContent = letter;
        button.onClick = () => {
            //todp
        };
        row.appendChild(button);
    }
    keyboard.appendChild(row)

}