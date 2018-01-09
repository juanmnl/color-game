import './../style/app.scss';

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

const game = {
  games: 0,
  score: 0,
  count: 0,
  numSquares: 6,
  colors: [],
  pickedColor: '',
  init: function() {
    this.setupModeBtns();
    this.setupSquares();
    this.reset();
    resetBtn.addEventListener('click', game.reset);
  },
  setupSquares: function() {
    for (let i = 0; i < squares.length; i++) {
      squares[i].addEventListener('click', function() {
        this.style.pointerEvents = '';
        var clickedColor = this.style.backgroundColor;
        game.count++;
        if (clickedColor === game.pickedColor) {
          game.win();
          this.style.pointerEvents = 'none';
          for (let i = 0; i < squares.length; i++) {
            squares[i].style.pointerEvents = 'none';
          }
        } else {
          game.nope();
          this.style.pointerEvents = 'none';
          this.style.backgroundColor = body.style.backgroundColor;
        }
        scoreDisplay.textContent = game.score;
      });
    }
  },
  setupModeBtns: function() {
    for (let i = 0; i < modeBtns.length; i++) {
      modeBtns[i].addEventListener('click', function() {
        modeBtns[0].classList.remove('selected');
        modeBtns[1].classList.remove('selected');
        this.classList.add('selected');
        this.textContent === 'Easy'
          ? (game.numSquares = 3)
          : (game.numSquares = 6);
        game.reset();
      });
    }
  },
  reset: function() {
    game.colors = game.generateRandomColors(game.numSquares);
    game.pickedColor = game.pickColor();
    game.count = 0;
    guess.textContent = game.pickedColor;
    body.style.backgroundColor = '#f5f5f5';
    for (let i = 0; i < squares.length; i++) {
      if (game.colors[i]) {
        squares[i].style.display = 'block';
        squares[i].style.backgroundColor = game.colors[i];
        squares[i].style.pointerEvents = '';
      } else {
        squares[i].style.display = 'none';
      }
    }
    resetBtn.textContent = 'New Colors';
    message.textContent = 'Pick a color';
    scream.textContent = '';
    scream.style.color = '';
    game.games++;
    gamesDisplay.textContent = `Game #${game.games}`;
  },
  pickColor: function() {
    var random = Math.floor(Math.random() * game.colors.length);
    return game.colors[random];
  },
  generateRandomColors: function(x) {
    let arr = [];
    for (let i = 0; i < x; i++) {
      arr.push(game.randomColor());
    }
    return arr;
  },
  randomColor: function() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  },
  changeColors: function(color) {
    for (let i = 0; i < squares.length; i++) {
      squares[i].style.backgroundColor = color;
    }
    body.style.backgroundColor = color;
  },
  screamer: function(str, color) {
    scream.style.color = color;
    scream.textContent = str;
    scream.classList.add('scream-now');
    setTimeout(function() {
      if (str === 'Nope' || str === 'You Suck!' || str === 'Sad!') {
        scream.textContent = '';
      }
      scream.classList.remove('scream-now');
    }, 600);
  },
  win: function() {
    if (game.count === 1) {
      game.score += 300;
      message.textContent = '+ 300';
      this.screamer('Sweet!', 'white');
    } else if (game.count === 6) {
      game.score += 25;
      message.textContent = '+ 25';
      this.screamer('You know nothing!', 'white');
    } else if (game.count > 3 && game.count < 6) {
      game.score += 50;
      message.textContent = '+ 50';
      this.screamer('Ok!', 'white');
    } else {
      game.score += 100;
      message.textContent = '+ 100';
      this.screamer('Winner!', 'white');
    }
    this.changeColors(game.pickedColor);
    resetBtn.textContent = 'Play again?';
  },
  nope: function() {
    game.score -= 100;
    message.textContent = '-100';
    if (game.count === 3) {
      this.screamer('You Suck!', 'black');
    } else if (game.count === 5) {
      this.screamer('Sad!');
    } else {
      this.screamer('Nope', 'black');
    }
  }
};

game.init();
