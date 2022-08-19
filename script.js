'use strict';

let score = 20;
let secretNumber = secretNumberFunction();
let highscore = 0;
let guessed = false;
let lost = false;
let possibleNumbers = [];
possibleNumbersGenerator(possibleNumbers);
function possibleNumbersGenerator(array) {
  for (let i = 1; i <= 20; i++) {
    array.push(i);
  }
}
const table = document.createElement('table');
const row1 = document.createElement('tr');
const row2 = document.createElement('tr');
const topRow = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const bottomRow = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];

topRow.forEach((e) => {
  let elementIndex = topRow.indexOf(e);
  let td = document.createElement('td');
  td.innerHTML = topRow[elementIndex];
  td.setAttribute('class', `impossible`);
  td.setAttribute('id', `${e}`);
  row1.appendChild(td);
});
bottomRow.forEach((e) => {
  let elementIndex = bottomRow.indexOf(e);
  let td = document.createElement('td');
  td.innerHTML = bottomRow[elementIndex];
  td.setAttribute('class', `impossible`);
  td.setAttribute('id', `${e}`);
  row2.appendChild(td);
});
table.appendChild(row1);
table.appendChild(row2);
document.getElementById('left').appendChild(table);

function secretNumberFunction() {
  return Math.round(Math.random() * (20 - 1) + 1);
}

function displayMessage(message) {
  document.querySelector('.message').textContent = `${message}`;
}

function checkIfIncludes() {
  for (let i = 1; i <= 20; i++) {
    document.getElementById(`${i}`).className = 'impossible';
  }

  possibleNumbers.forEach((e) => {
    document.getElementById(`${e}`).className = 'possible';
  });
}

function definingArea(num, direction) {
  if (possibleNumbers.includes(num)) {
    if (direction === 'higher') {
      possibleNumbers = possibleNumbers.filter((number) => number > num);
    } else {
      possibleNumbers = possibleNumbers.filter((number) => number < num);
    }
  }
}

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guessed && !lost) {
    if (guess !== secretNumber) {
      if (!guess) {
        displayMessage('No number.');
      } else if (guess < 0 || guess > 20) {
        displayMessage('Impossible number');
      } else if (guess < secretNumber) {
        displayMessage(`Higher`);
        definingArea(guess, 'higher');
        checkIfIncludes();
        if (score > 0) {
          score--;
          document.querySelector('.score').textContent = score;
        }
      } else {
        displayMessage(`Lower`);
        definingArea(guess, 'lower');
        checkIfIncludes();
        if (score > 0) {
          score--;
          document.querySelector('.score').textContent = score;
        }
      }
      if (score === 0) {
        gameLost();
        lost = true;
      }
    } else if (guess === secretNumber) {
      guessed = true;
      gameWon();
    }
  }
});

function gameLost() {
  displayMessage(`Game lost`);
  document.querySelector('.number').textContent = secretNumber;
  document.querySelector('body').style.backgroundColor = 'rgb(97, 1, 1)';
  document.querySelector('.number').style.width = '30rem';
}

function gameWon() {
  displayMessage(`Correct number`);
  document.querySelector('.number').textContent = secretNumber;
  document.querySelector('body').style.backgroundColor = '#60b347';
  document.querySelector('.number').style.width = '30rem';
  if (score > highscore) {
    highscore = score;
    document.querySelector('.highscore').textContent = highscore;
  }
  possibleNumbers = [];
  checkIfIncludes();
}

function reset() {
  guessed = false;
  lost = false;
  score = 20;
  possibleNumbers = [];
  possibleNumbersGenerator(possibleNumbers);
  document.querySelector('.score').textContent = score;
  document.querySelector('input').value = '';
  document.querySelector('.message').textContent = `Start guessing`;
  document.querySelector('body').style.backgroundColor = '#222';
  secretNumber = secretNumberFunction();
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  checkIfIncludes();
}

document.querySelector('.again').addEventListener('click', function () {
  reset();
});
