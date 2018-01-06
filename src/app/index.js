import '../style/app.scss';

console.log('Ah! Ah! Ah! You cheater!');

// Layout tool
let toggleLayout = document.getElementById('toggleLayout');
let screen = document.body;

toggleLayout.onclick = function() {
  screen.classList.toggle('layout');
  toggleLayout.classList.toggle('active');
};

// **********************************************************
var squares = document.querySelectorAll('.square');
var body = document.getElementsByTagName('body')[0];
var guess = document.getElementById('guess');
var message = document.getElementById('message');
var resetBtn = document.querySelector('#reset');
var easyBtn = document.querySelector('#easy');
var hardBtn = document.querySelector('#hard');
var scream = document.getElementsByClassName('scream')[0];
var scoreDisplay = document.querySelector('h1 > span');
var gamesDisplay = document.querySelector('.board > .games');

// ***** MAIN LOGIC *****
var numSquares = 6;
var colors = generateRandomColors(numSquares);
var pickedColor = pickColor();
guess.textContent = pickedColor;
var score = 0;
var count = 0;
var games = 0;
gamesDisplay.textContent = `Games Played: ${games}`;

for (let i = 0; i < squares.length; i++) {
  // Add initial colors to squares
  squares[i].style.backgroundColor = colors[i];
  // Add click listeners to squares
  squares[i].addEventListener('click', function() {
    // Grap picked color
    var clickedColor = this.style.backgroundColor;
    count++;
    // Compare clicked color to picked color
    if (clickedColor === pickedColor) {
      win();
      if (count === 1) {
        score += 300;
      } else {
        score += 100;
      }
    } else {
      nope();
      score -= 100;
      this.style.display = 'none';
    }
    console.log(count);
    console.log(score);
    scoreDisplay.textContent = score;
  });
}

// ***** ACTIONS *****
resetBtn.addEventListener('click', reset);
easyBtn.addEventListener('click', function() {
  hardBtn.classList.remove('selected');
  this.classList.add('selected');
  numSquares = 3;
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  guess.textContent = pickedColor;
  message.textContent = '';
  scream.textContent = '';
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
});
hardBtn.addEventListener('click', function() {
  easyBtn.classList.remove('selected');
  this.classList.add('selected');
  numSquares = 6;
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  guess.textContent = pickedColor;
  message.textContent = '';
  scream.textContent = '';
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    squares[i].style.display = '';
  }
});

// ***** FUNCTIONS *****
function win() {
  if (count === 1) {
    message.textContent = '+ 300';
  } else {
    message.textContent = '+ 100';
  }
  changeColors(pickedColor);
  screamer('Winner!', 'white');
  resetBtn.textContent = 'Play again?';
}

function nope() {
  message.textContent = '-100';
  screamer('Nope', 'black');
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

function reset() {
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  count = 0;
  guess.textContent = pickedColor;
  body.style.backgroundColor = '';
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
  }
  resetBtn.textContent = 'New Colors';
  message.textContent = '';
  scream.textContent = '';
  scream.style.color = '';
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.display = '';
  }
  games++;
  gamesDisplay.textContent = `Games Played: ${games}`;
}

// Shouts a word on click (winner, loser, etc...)
function screamer(str, color) {
  scream.style.color = color;
  scream.textContent = str;
  scream.classList.add('scream-now');
  setTimeout(function() {
    // review this ! **************************************
    if (str !== 'Winner!') {
      scream.textContent = '';
    }
    scream.classList.remove('scream-now');
  }, 600);
}

function generateSquares(n) {
  var arr = [];
  var template = `<div class="square"></div>`;
  for (let i = 0; i < n; i++) {
    arr.push(template);
  }
  return arr;
}
