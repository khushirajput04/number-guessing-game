let randomNumber = parseInt(Math.random()*100+1);
console.log(randomNumber);

const submit = document.querySelector('#submit');
const userInput = document.querySelector('#guessField');
const prevGuesses = document.querySelector('.guessesArray');
const remainingGuess = document.querySelector('.remainingGuess');
const finalResult = document.querySelector('.finalResult');
const startAgain = document.querySelector('.resultPara');

let p = document.createElement('p');

let prevGuessArr = [];
let numOfGuess = 1;
let playGame = true;

if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault();
        const guess = userInput.value;
        console.log(guess);
        validGuess(guess);
    })
}

function validGuess(guess){
    if(isNaN(guess)){
        alert(`Please enter a valid number, you just entered ${guess}`);
    }
    else if(guess < 1 || guess > 100){
        alert(`Please enter a valid number, you just entered ${guess}`);
    }
    else{
        prevGuessArr.push(guess);
        if(numOfGuess === 11){
            updateResultPara(guess);
            displayMessage(`Game Over. Random number was ${randomNumber}`);
            endGame();
        }
        else{
            updateResultPara(guess);
            checkGuess(guess);
        }
    }
}


function checkGuess(guess){
    if(guess == randomNumber){
        displayMessage(`Yeah! You guessed it right.`);
        endGame();
    }
    else if(guess < randomNumber){
        displayMessage(`Number is too low.`);
    }
    else if(guess > randomNumber){
        displayMessage(`Number is too high.`);
    }
}

function updateResultPara(guess){
    userInput.value = '';
    prevGuesses.innerHTML += `${guess}  `;
    numOfGuess++;
    remainingGuess.innerHTML = `${11 - numOfGuess}`;
}

function displayMessage(message){
    finalResult.innerHTML = `<h2>${message}</h2>`;
}

function endGame(){
    userInput.value = '';
    userInput.setAttribute('disabled',' '); //key value pair
    p.classList.add('button');
    p.innerHTML = `<h2 id="newgame">Start New Game</h2>`
    startAgain.appendChild(p);
    playGame = false;
    newGame();
}

function newGame(){
    const newGameBtn = document.querySelector('#newgame');
    newGameBtn.addEventListener('click', function(e){
        randomNumber = parseInt(Math.random()*100+1);
        prevGuessArr = [];
        numOfGuess = 1;
        prevGuesses.innerHTML = '';
        remainingGuess.innerHTML = `${11 - numOfGuess}`;
        userInput.removeAttribute('disabled');
        startAgain.removeChild(p);
        finalResult.innerHTML = '';
        playGame = true;
    })
}