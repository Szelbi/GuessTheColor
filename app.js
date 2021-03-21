
// Selectors
const radioButtons = document.querySelectorAll(".radiobtn-input");
const playButton = document.querySelector(".play-button");

const squaresContainer = document.querySelector(".squares-container");

//Event Listeners

// document.addEventListener('DOMContentLoaded', renderSquares);
for (i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('click', updateOptions);
}
playButton.addEventListener('click', play);

// Variables

let winningColor;

let options = {
    squares: 3,
    rounds: 5
}

let squares;

// Functions
function checkOption(option) {

    let selector = `#${option}-filter`;
    let filterOptions = document.querySelector(selector);

    for (i = 0; i < filterOptions.length; i++) {
        if (filterOptions[i].checked === true)
            return filterOptions[i].value;
    }
}

function updateOptions() {
    options.squares = checkOption('squares');
    options.rounds = checkOption('rounds');
}

function play() {
    // alert(options.squares);
    renderSquares();
}


function renderSquares() {

    // myNode.removeChild(myNode.lastChild);

    while (squaresContainer.hasChildNodes()) {
        squaresContainer.removeChild(squaresContainer.lastChild);
    }

    for (let i = 0; i < options.squares; i++) {
        let square = document.createElement('div');
        // square.classList.add(`square-${i}`);
        square.setAttribute('id', `square-${i}`);
        square.classList.add('square', 'square-active');
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

    if (square.classList.contains('square-active')) {

        // square.addEventListener('animationend', () => {

        if (square.style.backgroundColor === winingColor) {

            square.classList.add('square-correct');
            addPoint();
            disableSquares();

            setTimeout(function () {
                renderSquares();
            }, 1000);

        }
        else {
            substractPoint()
            square.classList.remove('square-active');
            square.classList.add('square-wrong');
        }
        // })
    }
}

function getSeconds() {
    let elem = document.querySelector('#seconds');
    return Number(elem.innerHTML);
}

function getPoints() {
    let elem = document.querySelector('#points');
    return Number(elem.innerHTML);
}

function substractPoint() {
    let elem = document.querySelector('#points');
    elem.innerHTML = Number(elem.innerHTML) - 1;
}

function addPoint() {
    let points = document.querySelector('#points');
    points.innerHTML = Number(points.innerHTML) + 1;
    points.classList.add('point-animate');
    points.addEventListener('animationend', () => {
        points.classList.remove('point-animate');
    });
}

function disableSquares() {
    let squares = document.querySelectorAll('.square');

    /**
     * document.querySelectorAll returns NodeList but to iterate for it using foreach I need 
     * to convert the NodeList to array. Array.from(squares) is the function I need
     */
    Array.from(squares).forEach(square => {
        square.classList.remove('square-active');
    });
}