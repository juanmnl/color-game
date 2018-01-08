import '../style/app.scss';

console.log('Ah! Ah! Ah! You cheater!');

// **********************************************************
var squares = document.querySelectorAll('.square');
var body = document.getElementsByTagName('body')[0];
var guess = document.getElementById('guess');
var message = document.getElementById('message');
var resetBtn = document.querySelector('#reset');
var modeBtns = document.querySelectorAll('.mode');
var scream = document.getElementsByClassName('scream')[0];
var scoreDisplay = document.querySelector('h1 > span');
var gamesDisplay = document.querySelector('.board > .games');

// ***** MAIN UI *****
var numSquares = 6;
var colors = generateRandomColors(numSquares);
var pickedColor = pickColor();
guess.textContent = pickedColor;
var score = 0;
var count = 0;
var games = 1;
gamesDisplay.textContent = `Game #${games}`;

for (let i = 0; i < squares.length; i++) {
  squares[i].style.backgroundColor = colors[i];
  squares[i].addEventListener('click', function() {
    var clickedColor = this.style.backgroundColor;
    count++;
    if (clickedColor === pickedColor) {
      win();
      if (count === 1) {
        score += 300;
      } else if (count === 6) {
        score += 50;
      } else {
        score += 100;
      }
    } else {
      nope();
      score -= 100;
      this.style.backgroundColor = body.style.backgroundColor;
    }
    scoreDisplay.textContent = score;
  });
}

// ***** UI CONTROLS *****
resetBtn.addEventListener('click', reset);

for (let i = 0; i < modeBtns.length; i++) {
  modeBtns[i].addEventListener('click', function() {
    modeBtns[0].classList.remove('selected');
    modeBtns[1].classList.remove('selected');
    this.classList.add('selected');
    this.textContent === 'Easy' ? (numSquares = 3) : (numSquares = 6);
    reset();
  });
}

// ***** FUNCTIONS *****
function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  count = 0;
  guess.textContent = pickedColor;
  body.style.backgroundColor = '#f5f5f5';
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
  resetBtn.textContent = 'New Colors';
  message.textContent = 'Pick a color';
  scream.textContent = '';
  scream.style.color = '';
  games++;
  gamesDisplay.textContent = `Game #${games}`;
}

function win() {
  if (count === 1) {
    message.textContent = '+ 300';
    screamer('Sweet!', 'white');
  } else if (count === 6) {
    message.textContent = '+ 50';
    screamer('You know nothing!', 'white');
  } else {
    message.textContent = '+ 100';
    screamer('Winner!', 'white');
  }
  changeColors(pickedColor);
  resetBtn.textContent = 'Play again?';
}

function nope() {
  message.textContent = '-100';
  if (count === 3) {
    screamer('You Suck!', 'black');
  } else {
    screamer('Nope', 'black');
  }
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors(x) {
  let arr = [];
  for (let i = 0; i < x; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function changeColors(color) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
  body.style.backgroundColor = color;
}

// Shouts a word on click (winner, loser, etc...)
function screamer(str, color) {
  scream.style.color = color;
  scream.textContent = str;
  scream.classList.add('scream-now');
  setTimeout(function() {
    if (str === 'Nope' || str === 'You Suck!') {
      scream.textContent = '';
    }
    scream.classList.remove('scream-now');
  }, 600);
}
