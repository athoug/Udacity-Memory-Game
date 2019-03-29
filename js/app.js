// ------------------------
//      Global Village
// ------------------------

let cardsCollected = [];
let DeckOfCards = [];
let cardOneElement, cardTwoElement;
let currentTurn = 0;
let moves = 0;
let stars = 0;
let gameWon = false;

const deck = document.querySelector('.deck');
const winContainer = document.querySelector('.win');
const btnReplay = document.querySelector('.replay');
const moveHolder = document.querySelector('.moves');
const starHolder = document.querySelector('.star');

const classList = ['fa-html5', 'fa-html5', 'fa-css3-alt', 'fa-css3-alt', 'fa-js-square', 'fa-js-square', 'fa-npm', 'fa-npm', 'fa-react', 'fa-react', 'fa-node-js', 'fa-node-js', 'fa-gulp', 'fa-gulp', 'fa-github', 'fa-github'];
const filteredList = ['fa-html5', 'fa-css3-alt', 'fa-js-square', 'fa-npm', 'fa-react', 'fa-node-js', 'fa-gulp', 'fa-github'];
// ------------------------
//      The Game
// ------------------------

// Part 1. Shuffle the cards
letsShuffleThis();

// Part 2: add the flipping functionality to the deck of cards
//  make use of the bubbling of events and attach the listener to the parent
deck.addEventListener('click', cardClickHandler)

// Part 3: When game completes add option to play again
btnReplay.addEventListener('click', replayTheGame);



// ------------------------
//      Functions
// ------------------------

// Function to shuffle a list of class names and then attaches them to a card
function letsShuffleThis() {
    // 1. shuffle the list to randomize position
    DeckOfCards = shuffle([...classList]);
    // 2. get a refrence of the icon element to add class font awesome to.
    const icons = document.querySelectorAll('.back');
    // 3. remove any pre-defined classes in them
    icons.forEach(function (el) {
        for (let x = 0; x < filteredList.length; x++) {
            if (el.classList.contains(filteredList[x])) {
                el.classList.remove(filteredList[x]);
            }
        }
    });
    // 4. add the class to the list of classes in the icon element
    for (let i = 0; i < icons.length; i++) {
        icons[i].classList.add(DeckOfCards[i]);
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// function to replay the game
function replayTheGame() {
    // hide message again
    hideWin();
    // remove any disabled elements
    document.querySelectorAll('.cant-click-this').forEach(function(el) {
        el.classList.remove('cant-click-this');
    });
    // remove any flipped classes
    document.querySelectorAll('.card-container').forEach(function (el) {
        flipDown(el);
    });
    // reset the variables
    resetGame();
}

// function reset start game
function resetGame() {
    // reset the global variables
    cardsCollected = [];
    DeckOfCards = [];
    cardOneElement, cardTwoElement;
    currentTurn = 0;
    gameWon = false;
    moves = 0;

    // Shuffle the cards
    letsShuffleThis();
}

// function that handles teh card click event
function cardClickHandler(e) {
    if (!gameWon && e.target.classList.contains('card-face')) {
        flipUp(e.target.parentNode);
        checkStats(e.target.parentNode);
    }

}

// functions to assigning values and check stats
function checkStats(el) {
    switch (currentTurn) {
        case 0:
            cardOneElement = el;
            currentTurn += 1;
            break;
        case 1:
            cardTwoElement = el;
            break;
    }

    if (cardOneElement && cardTwoElement) {
        setTimeout(areTheyEqual, 1000);
    }
}

// function to check their euality and handels the result
function areTheyEqual() {

    // check class list -> to get the value of teh faced down card
    const cardOneValue = cardOneElement.innerHTML.trim();
    const cardTwoValue = cardTwoElement.innerHTML.trim();

    // check if both classes are equal and that the item isn't in the list to begin with
    if (!cardsCollected.includes(cardOneValue) && (cardOneValue === cardTwoValue)) { // if they are equal
        equal(cardOneValue, cardTwoValue);
    } else {
        notEqual();
    }
    // increase move count
    moves += 1;

    // reset the round back to zero
    currentTurn = 0;

    // check if all cards flipped open
    if (cardsCollected.length === 16) {
        gameWon = true;
        setTimeout(winMessage, 300);
    }
}

// function to handel what happenes when cards match
function equal(itemOne, itemTwo) {
    // 1. add them to the array of flipped classes
    cardsCollected.push(itemOne, itemTwo);
    // 2. TO DO: add animation UI for correct result
    correct(cardOneElement);
    correct(cardTwoElement);
    // remove class from element
    setTimeout(function () {
        removeCorrect(cardOneElement)
    }, 350);
    setTimeout(function () {
        removeCorrect(cardTwoElement)
    }, 350);
    // 3. disable the element from being clicked
    disableClick(cardOneElement);
    disableClick(cardTwoElement);
    // 4. reset element pointers
    setTimeout(resetElementPointer, 400);
}

// function to handel cards not matching
function notEqual() {
    // 1. TO DO: add animation UI for wrong match
    wrong(cardOneElement);
    wrong(cardTwoElement);
    // 2. flip the card back down
    setTimeout(function () {
        removeWrong(cardOneElement);
        flipDown(cardOneElement);
     }, 250);
    setTimeout(function () {
        removeWrong(cardTwoElement);
        flipDown(cardTwoElement);
    }, 250);
    // 3. reset element pointers
    setTimeout(resetElementPointer, 300);
}

// function display win message
function winMessage() {
    moveHolder.textContent = moves;
    starHolder.textContent = stars;
    winContainer.classList.add('win-screen');
}

// function hide win message
function hideWin() {
    winContainer.classList.remove('win-screen');
}

// function to flip the card up
function flipUp(element) {
    element.classList.add('flipped');
}

// function to flip the card down
function flipDown(element) {
    element.classList.remove('flipped');
}

// function to add correct animation
function correct(el) {
    el.classList.add('correct');
}

function removeCorrect(el) {
    el.classList.remove('correct');
}

// function to add wrong animation
function wrong(el) {
    el.classList.add('wrong');
}

function removeWrong(el) {
    el.classList.remove('wrong');
}

//  function to disable element from being clicked
function disableClick(el) {
    el.classList.add('cant-click-this');
}

// function to re-enable elements to be clicked
function enableClick(el) {
    el.classList.remove('cant-click-this');
}

// function to reset the variables that holds a pointer to a DOM element
function resetElementPointer() {
    cardOneElement = null;
    cardTwoElement = null;
}



