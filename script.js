'use strict';

const secretNumberFunction = () => {
  function reset() {
    return 0;
  }
  return Math.round(Math.random() * (20 - 1) + 1);
};
let score = 20;
let secretNumber = secretNumberFunction();
let highscore = 0;
let guessed = false;

function displayMessage(message) {
  document.querySelector('.message').textContent = `${message}`;
}

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = 'No number.';
  } else if (guess === secretNumber) {
    guessed = true;
    gameWon();
    // proverqvame dali igraem oshte
  } else if (!guessed) {
    if (guess !== secretNumber) {
      if (score > 0) {
        score--;
        document.querySelector('.score').textContent = score;
      } else {
        displayMessage(`You lost`);
      }
      if (guess < secretNumber) {
        displayMessage(`Higher`);
      } else {
        displayMessage(`Lower`);
      }
    }
  }
});

function gameWon() {
  displayMessage(`Correct number`);
  document.querySelector('.number').textContent = secretNumber;
  document.querySelector('body').style.backgroundColor = '#60b347';
  document.querySelector('.number').style.width = '30rem';
  if (score > highscore) {
    highscore = score;
    document.querySelector('.highscore').textContent = highscore;
  }
}

function reset() {
  guessed = false;
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('input').value = '';
  document.querySelector('.message').textContent = `Start guessing`;
  document.querySelector('body').style.backgroundColor = '#222';
  secretNumber = secretNumberFunction();
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
}

document.querySelector('.again').addEventListener('click', function () {
  reset();
});
