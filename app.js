
// Selectors
const radioButtons = document.querySelectorAll(".radiobtn-input");
const playButton = document.querySelector(".play-button");
const squaresContainer = document.querySelector(".squares-container");

//Event Listeners
// playButton.addEventListener('click', alert1);
document.addEventListener('DOMContentLoaded', renderSquares(3));
for (i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('click', checkType);
}

// Variables

let winningColor;


// Functions

function checkType(event) {

    if (this.name === 'squares')
        renderSquares(this.value);

    else if (this.name === 'rounds')
        setRounds(this.value);
}


function renderSquares(int) {

    console.log('squares: ' + int);

    // myNode.removeChild(myNode.lastChild);

    while (squaresContainer.hasChildNodes()) {
        squaresContainer.removeChild(squaresContainer.lastChild);
    }

    for (let i = 0; i < int; i++) {
        let square = document.createElement('div');
        // square.classList.add(`square-${i}`);
        square.setAttribute('id', `square-${i}`);
        square.classList.add('square', 'square-correct');
        square.style.backgroundColor = getRandomRGB();
        square.addEventListener('click', checkWin);
        squaresContainer.appendChild(square);
    }

    setWiningColor();
}

function setWiningColor() {

    let squares = squaresContainer.children;
    let count = squaresContainer.childElementCount;
    let int = getRandomInt(0, count - 1);
    winingColor = squares[int].style.backgroundColor;

    let header = document.querySelector("#rgb-result");
    header.innerHTML = winingColor;
}


function setRounds(int) {
    console.log('rounds: ' + int);
}

function getRandomRGB() {

    let min = 0;
    let max = 255;
    let red = getRandomInt(min, max);
    let green = getRandomInt(min, max);
    let blue = getRandomInt(min, max);

    return `rgb(${red}, ${green}, ${blue})`
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function checkWin(event) {
    let square = this;
    let squareRGB = square.style.backgroundColor;

    if (squareRGB === winingColor) {
        alert('Dobrze!');
    }
    else {
        alert('Źle!');
    }

}