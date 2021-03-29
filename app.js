/**
 * SELECTORS
 */
const radioButtons = document.querySelectorAll(".radiobtn-input");
const playButton = document.querySelector(".play-button");
const pauseButton = document.querySelector(".pause-button");
const exitButton = document.querySelector(".exit-button");
const playPauseContainer = document.querySelector(".play-pause-container");

const squaresContainer = document.querySelector(".squares-container");


/**
 * EVENT LISTENERS
 */
document.addEventListener("DOMContentLoaded", updateOptions);
for (i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('click', updateOptions);
}
playButton.addEventListener('click', playGame);


/**
 * VARIABLES
 */
const defaultSeconds = 10;

let counter;

let winningColor;

let timeLeft;


/**
 * Default options. These could be null by default as well becouse updateOptions() 
 * is run on DOM loaded.
 */
let options = {
    squares: 3,
    rounds: 5,
    seconds: 20,
    gameOn: false,
    paused: false,
}


/**
 * FUNCTIONS 
 */


/**
 * Takes id of form element to check what is checked
 * Returns value of the checked option
 */
function checkOption(option) {

    let selector = `#${option}-filter`;
    let filterOptions = document.querySelector(selector);

    for (i = 0; i < filterOptions.length; i++) {
        if (filterOptions[i].checked === true)
            return Number(filterOptions[i].value);
    }
}

function updateOptions() {
    options.squares = checkOption('squares');
    options.rounds = checkOption('rounds');
    options.seconds = checkOption('seconds');
}

function playGame() {
    togglePlayReset()
    setAllRounds();
    newRound();
    optionsEnabled(false);
}

function pauseGame() {

    options.paused = !options.paused;
    if (options.paused) {
        document.querySelector(".pause-button").innerHTML = '<i class="pause-button-icon button-icon fas fa-play"></i>';
        clearInterval(counter);
    }
    else {
        document.querySelector(".pause-button").innerHTML = '<i class="pause-button-icon button-icon fas fa-pause"></i>';
        runTimer(getSeconds());
    }
}

/**
 * Used on game ending and on exit button
 */
function exitGame() {

    togglePlayReset();

    options.gameOn = false;
    options.paused = false;

    removeSquares();
    optionsEnabled(true);
    clearInterval(counter);
    document.getElementById("seconds").innerHTML = 0;
    document.getElementById("rgb-result").innerHTML = '';
    document.getElementById("points").innerHTML = 0;
    document.getElementById("rounds-now").innerHTML = 0;
    document.getElementById("rounds-all").innerHTML = 0;

}

/**
 * Runs on every new round. 
 * @TODO the gameover check works well but "+1" shouldn't be here..
 */
function newRound() {
    let round = addRound();
    if (round === options.rounds + 1)
        return gameOver();
    runTimer(options.seconds);
    renderSquares();
    setWiningColor();
}

/**
 * When user click play the menu converts to PAUSE and RESET buttons,
 * when user click resert then menu converts to PLAY button only.
 */
function togglePlayReset() {

    playPauseContainer.textContent = '';

    options.gameOn = !options.gameOn;

    if (options.gameOn) {

        // pause Button
        let pauseBtn = document.createElement('button');
        pauseBtn.classList.add("pause-button", 'button');
        pauseBtn.innerHTML = '<i class="pause-button-icon button-icon fas fa-pause"></i>';
        pauseBtn.addEventListener('click', pauseGame);
        playPauseContainer.appendChild(pauseBtn);

        // exit Button
        let exitBtn = document.createElement('button');
        exitBtn.classList.add("exit-button", 'button');
        exitBtn.innerHTML = '<i class="exit-button-icon button-icon fas fa-undo"></i>';
        exitBtn.addEventListener('click', exitGame);
        playPauseContainer.appendChild(exitBtn);
    }
    else {
        // playButton
        let playBtn = document.createElement('button');
        playBtn.classList.add("play-button", 'button');
        playBtn.innerHTML = '<i class="play-button-icon button-icon fas fa-play"></i>';
        playBtn.addEventListener('click', playGame);
        playPauseContainer.appendChild(playBtn);
    }
}

/**
 * Runs every new round.
 */
function renderSquares() {

    removeSquares();

    for (let i = 0; i < options.squares; i++) {
        let square = document.createElement('div');
        // square.classList.add(`square-${i}`);
        square.setAttribute('id', `square-${i}`);
        square.classList.add('square', 'square-active');
        square.style.backgroundColor = getRandomRGB();
        square.addEventListener('click', checkWin);
        squaresContainer.appendChild(square);
    }
}


function removeSquares() {
    while (squaresContainer.hasChildNodes()) {
        squaresContainer.removeChild(squaresContainer.lastChild);
    }
}

/**
 * Function takes number as argument. By default it would be int from options.seconds
 * but it also allows to resume game paused by user.
 */
function runTimer(countFrom) {

    clearInterval(counter);

    let elem = document.getElementById("seconds");
    elem.innerHTML = countFrom;

    sec = countFrom;
    let msec = sec * 10;

    counter = setInterval(function () {
        msec--;
        let result = msec / 10;
        /**
         * using toLocaleString() to output time always with 1 fraction decimal
         * e.g. number 2 will be 2.0
         */
        let numWithZeroes = result.toLocaleString("en", { useGrouping: false, minimumFractionDigits: 1 });

        elem.innerHTML = numWithZeroes;

        if (msec == 0) {
            substractPoint();
            newRound();
        }
    }, 100);
}

/**
 * Taking the rgb color from random square from the rendered ones and writing 
 * the output on the screen as the color to guess for user.
 */
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

        if (square.style.backgroundColor === winingColor) {

            square.classList.add('square-correct');
            // points.addEventListener('animationend', () => {
            addPoint();
            // });

        }
        else {
            substractPoint()
            square.classList.remove('square-active');
            square.classList.add('square-wrong');
        }
    }
}


function getSeconds() {
    return Number(document.querySelector('#seconds').innerHTML);
}


function getPoints() {
    return Number(document.querySelector('#points').innerHTML);
}


function getRound() {
    return Number(document.querySelector('#round-now').innerHTML);
}


function setAllRounds() {
    document.getElementById("rounds-all").innerHTML = options.rounds;
}


function substractPoint() {
    let points = document.querySelector('#points');
    points.innerHTML = Number(points.innerHTML) - 1;
    points.classList.add('poft-animate');
    // points.addEventListener('animationend', () => {
    points.onanimationend = () => {
        points.classList.remove('point-animate');
    };
}


function addPoint() {
    let points = document.querySelector('#points');
    points.innerHTML = Number(points.innerHTML) + 1;
    points.classList.add('point-animate');
    // points.addEventListener('animationend', () => {
    points.onanimationend = () => {
        points.classList.remove('point-animate');
        clearInterval(counter);
        disableSquares();
        newRound();
    };
}

/**
 * Function that prevents to click on another square when user already 
 * guessed the correct one. In another way point would be needlessly substracted.
 */
function disableSquares() {
    let squares = document.querySelectorAll('.square');

    /**
     * document.querySelectorAll returns NodeList but to iterate for it using foreach I need 
     * to convert the NodeList to array. 
     */
    Array.from(squares).forEach(square => {
        square.classList.remove('square-active');
    });
}

/**
 * Writing next round to the #rounds-now elem
 * Returns number of round already added.
 */
function addRound() {
    let nowRound = document.getElementById("rounds-now");
    let newRound = Number(nowRound.innerHTML) + 1;

    nowRound.innerHTML = newRound;
    return newRound;
}

/**
 * Alert output for user when the game ends.
 * Could be prettier tbh..
 */
function gameOver() {

    let pts = getPoints();
    let stringEnd = pts == 1 ? 'punkt' : pts == 2 ? 'punkty' : 'punktów';
    alert(`Koniec gry! Twój wynik to ${pts} ${stringEnd} z ${options.rounds} możliwych!`);
    exitGame();
}

/**
 * Adds disabled property to input elemen.
 * :disabled property is handled in scss.
 */
function optionsEnabled(enabled = true) {
    for (i = 0; i < radioButtons.length; i++) {
        radioButtons[i].disabled = !enabled;
    }
}