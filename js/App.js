
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
    'patio',
    'darts',
    'piano',
    'horse',
];

// select a random word of wordlist
let randomIndex = Math.floor(Math.random() * wordList.length);
let secret = wordList[randomIndex];


let attempts = []
let currentAttempt = ''

let counter = 0;
function updateGrid() {
    for (let i = 0; i < 6; i++) {
        let row = grid.children[i]
        for (let j = 0; j < 5; j++) {
            let cell = row.children[j]
             
        }
    }
}

