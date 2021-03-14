
// Selectors
const radioButtons = document.querySelectorAll(".radiobtn-input");
const playButton = document.querySelector(".play-button");
const squaresContainer = document.querySelector(".squares-container");

//Event Listeners
playButton.addEventListener('click', alert1);
for (i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('click', checkType);
}



// Functions
function alert1() {
    alert('123');
}


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
        square.setAttribute('class', 'square');
        squaresContainer.appendChild(square);

    }


}


function setRounds(int) {
    console.log('rounds: ' + int);

}