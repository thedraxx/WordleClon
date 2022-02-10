
// input
window.addEventListener('keydown', handleKeyDown);

function handleKeyDown(e) {
    let letter = e.key.toLowerCase();
   
    if (letter === 'enter') {
        if (currentAttempt.length < 5) {
            return alert('need more letters');
        }
        history.push(currentAttempt);
        currentAttempt = '';
    }

    else if (letter === 'backspace') {
        currentAttempt = currentAttempt.slice(0, currentAttempt.length - 1)
    }

    else if (/[a-z]/.test(letter)){
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
buildGrid();
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
            cell.style.backgroundColor = '#2C3333 ';
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
        return '#2C3333 '; // Black
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

