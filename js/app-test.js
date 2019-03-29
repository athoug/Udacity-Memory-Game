// variables to use in the game
let cardOneElement, cardTwoElement; // pointers to the DOM elements being clicked
let cardOneVale, cardTwoValue; // variables to hold the values of the cards flipped
let currentMatch; // hold the value of the current match
let flipCount = 0; // counter for a single round of card flips [must not excced 1 since in each round you can only flip two cards]
let gameFinish = false; // a boolean to indicate of the game is complet or not
let cardCount = 0; // counter to count the number of matched cards
let complete = 8; // holds the value of matched cards to complete the game


// Part 1: get the card list, shuffle them, then add them to the html
// 1. list of font awesome classes to use for images
let classList = ['fa-html5', 'fa-html5', 'fa-css3-alt', 'fa-css3-alt', 'fa-js-square', 'fa-js-square', 'fa-npm', 'fa-npm', 'fa-react', 'fa-react', 'fa-node-js', 'fa-node-js', 'fa-gulp', 'fa-gulp', 'fa-github', 'fa-github'];
// 2. shuffle the list to randomize position
classList = shuffle(classList);
// 3. get a refrence of the icon element to add class font awesome to.
const icons = document.querySelectorAll('.fab');
// 4. add the class to the list of classes in the icon element
for (let i = 0; i < icons.length; i++) {
    icons[i].classList.add(classList[i]);
}

// Part 2: add the flipping functionality to the deck of cards
// 1. select the cards container
const deck = document.querySelector('.deck');
// 2. make use of the bubbling of events and attach the listener to the parent
deck.addEventListener('click', function (e) {
    flipMe(e.target.parentNode);
    console.log(e.target.nextElementSibling);

    // check how many times user flipped the cards
    if (flipCount === 0) {
        cardOneElement = e.target.parentNode;
        cardOneVale = e.target.nextElementSibling;
        flipCount++;
    } else if (flipCount === 1) {
        cardTwoElement = e.target.parentNode;
        cardTwoValue = e.target.nextElementSibling;
        flipCount++;

        setTimeout(gameCheck, 1000);
    }
})



















// Methods

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

// function to toggle fliping the cards
function flipMe(element) {
    element.classList.toggle('flipped');
}

// function to check if type is a match
function checkMatch(element1, element2) {
    const card1 = Array.from(element1.classList);
    const card2 = Array.from(element2.classList);
    return (card1[3] === card2[3])
}

// function to check game
function gameCheck() {
    // check if match
    currentMatch = checkMatch(cardOneVale, cardTwoValue);
    if (currentMatch) {
        cardCount++; // update the card count
        flipCount = 0; // reset flips
    } else {
        flipCount = 0; // reset flips
        // re-flip cards
        flipMe(cardOneElement);
        flipMe(cardTwoElement);
    }
}
