
// Selectors
const grid = document.querySelector('#grid');
const keyboard = document.querySelector('#keyboard');
const navbar = document.querySelector('.navbar');


// Colors 
const black = '#000000';
const gray = '#686868';
const darkgray = '#3a3a3a'
const green = '#6AAA64';
const yellow = '#C9B458';
const lightgray = '#b4b4b4';


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

// select a word of wordlist
let random = Math.floor(Math.random(wordList.length) * 7);
let secret = wordList[random];
console.log(secret);

// The word who usser ACTUALLY introduce
let currentAttempt = ''
//the words who usser introduce
let history = [];

function handleKeyDown(e) {
    handleKey(e.key);
}

function handleKey(key) {
    if (history.length === 6) {
        return
    }
    let letter = key.toLowerCase();
    if (letter === 'enter') {
        if (currentAttempt.length < 5) {
            // return alert('need more letters');
            animateShake(currentAttempt.length)
            
        } else if (history.length === 5 && currentAttempt !== secret) {
 
            setTimeout(() => {
                navbar.innerHTML = `
                <div class="alert">
                <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                <p> Bad Lucky..</p> The secret word is: ${secret} 
                refresh the page to try again!
              </div> `
                
            }, 100);

        } else {
            history.push(currentAttempt);
            currentAttempt = '';
            updateKeyBoard();
            saveGame();
        }
    }

    else if (letter === 'backspace') {
        currentAttempt = currentAttempt.slice(0, currentAttempt.length - 1)
    }

    else if (/^[a-z]$/.test(letter)) {
        if (currentAttempt.length < 5) {
            currentAttempt += letter;
            animatePress(currentAttempt.length - 1)
        }
    }

    updateGrid();
}


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
            cell.innerHTML = `<h1 class = 'word'> ${attempt[i]} </h1> `//Put the word attempt in the cell
        } 
        
        else {
            // The way that only makes the CSS not destroy the document
            cell.innerHTML = '<div style = "opacity:0"></div>'
            clearAnimate(cell);
        }

        if (isCurrent) {
            
            cell.style.borderColor = '';
            if (attempt[i] !== undefined) {
                cell.style.borderColor = lightgray;
            }
        } 
        
        else {
            cell.style.backgroundColor = getBgColor(attempt, i) //This function put the color in the cell
        }
    }
}

// function change color of the Grid
function getBgColor(attempt, i) {
    let correctLatter = secret[i];
    let attemptLatter = attempt[i];

    if (attemptLatter === undefined) {
        return black;
    }

    else if (secret.indexOf(attemptLatter) === -1) //If the letter of secret word doesnt find the letter of the attempt 
    {
        return gray
    }

    else if (correctLatter === attemptLatter) {
        return green;
    }

    else {
        return yellow;
    }

}

function buildKeyboard() {
    buildKeyboardRow('qwertyuiop', false);
    buildKeyboardRow('asdfghjkl', false);
    buildKeyboardRow('zxcvbnm', true);
}

function buildKeyboardRow(letters, isLastRow) {

    let row = document.createElement('div')

    if (isLastRow) {
        let button = document.createElement('button');
        button.className = 'buttonKeyboard';
        button.textContent = 'Enter';
        button.style.backgroundColor = gray;
        button.onclick = () => {
            handleKey('enter');
        };
        row.appendChild(button);
        keyboard.appendChild(row)
    }

    for (let letter of letters) {
        let button = document.createElement('button');
        button.className = 'buttonKeyboard';
        button.textContent = letter;
        button.style.backgroundColor = gray;
        button.onclick = () => {
            handleKey(letter);
        };
        keyboardButtons.set(letter, button)
        row.appendChild(button);
    }
    keyboard.appendChild(row)

    if (isLastRow) {
        let button = document.createElement('button');
        button.className = 'buttonKeyboard';
        button.textContent = '⌫';
        button.style.backgroundColor = gray;
        button.onclick = () => {
            handleKey('backspace');
        };
        row.appendChild(button);
        keyboard.appendChild(row)
    }
}

function getBetterColor(a, b) {
    if (a === green || b === green) {
        return green
    }
    if (a === yellow || b === yellow) {
        return yellow
    }
    return darkgray
}

function updateKeyBoard() {
    let bestColors = new Map()
    for (let attempt of history) {
        for (let i = 0; i < attempt.length; i++) {
            let color = getBgColor(attempt, i)
            let key = attempt[i]
            let bestColor = bestColors.get(key)
            bestColors.set(key, getBetterColor(color, bestColor))
        }
    }
    for (let [key, button] of keyboardButtons) {
        button.style.backgroundColor = bestColors.get(key)
        button.style.borderColor = bestColors.get(key)
    }
}

function animatePress(index) {
    let rowIndex = history.length
    let row = grid.children[rowIndex]
    let cell = row.children[index]
    cell.style.animationName = 'press';
    cell.style.animationDuration = '0.5s';
}

function clearAnimate(cell) {
    cell.style.animationName = '';
    cell.style.animationDuration = '';
}

function animateShake() {
    grid.style.animationName = 'shake';
    grid.style.animationDuration = '0.5s';
    setTimeout(() => {
        grid.removeAttribute('style');
    }, 500);
}

function loadGame() {
    let data
    try {
        data = JSON.parse(localStorage.getItem('data'))
    } catch { }
    if (data != null) {
        if (data.secret === secret) {
            history = data.history;
            
        }
    }
}

//LocalStorage
function saveGame() {
    let data = JSON.stringify({
        secret,
        history
    })
    try {
        localStorage.setItem('data', data)
    }
    catch { }
}

let keyboardButtons = new Map();
loadGame();
buildGrid();
buildKeyboard();
updateGrid();

window.addEventListener('keydown', handleKeyDown); // input