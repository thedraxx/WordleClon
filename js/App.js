
let grid = document.querySelector('#grid');


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

buildGrid();


// Word List 
let wordList = [
    // 'patio',
    // 'darts',
    // 'piano',
    'horse',
];

// select a random word of wordlist
let randomIndex = Math.floor(Math.random() * wordList.length);
let secret = wordList[randomIndex];


let attempts = ['roha']
let currentAttempt = ''

updateGrid() 

function updateGrid() {
    let row = grid.firstChild
    for (let attempt of attempts) {
        drawPastAttempt(row, attempt)
        row = row.nextSibling
    }
    drawCurrentAttempt(row, currentAttempt)
}

function drawPastAttempt(row, attempt) {
    for (let i = 0; i < 5; i++) {
        let cell = row.children[i]
        cell.textContent = attempt[i]
        cell.style.backgroundColor = getBgColor(attempt, i)
    }
}

function drawCurrentAttempt(row, attempt) {
    for (let i = 0; i < 5; i++) {
        let cell = row.children[i]
        cell.textContent = attempt[i] ?? ''

    }
}

function getBgColor(attempt, i) {
    let correctLatter = secret[i];
    let attemptLatter = attempt[i];

    if (!secret.indexOf(attemptLatter) === -1) {
        return ' #787C7E'
    }

    if (correctLatter === attemptLatter) {
        return '#6AAA64'
    }

    return '#C9B458'

}