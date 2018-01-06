import '../style/app.scss';

console.log('Hello, Wolfpack!');

let toggleLayout = document.getElementById('toggleLayout');
let screen = document.body;

toggleLayout.onclick = function() {
  screen.classList.toggle('layout');
  toggleLayout.classList.toggle('active');
};

// ***************************************
var squares = document.querySelectorAll('.square');
var body = document.getElementsByTagName('body')[0];
var guess = document.getElementById('guess');
var message = document.getElementById('message');
var resetBtn = document.querySelector('#reset');
var easyBtn = document.querySelector('#easy');
var hardBtn = document.querySelector('#hard');
var scream = document.getElementsByClassName('scream')[0];

// ***** MAIN LOGIC *****
var colors = generateRandomColors(6);
var pickedColor = pickColor();

for (let i = 0; i < squares.length; i++) {
  // Add initial colors to squares
  squares[i].style.backgroundColor = colors[i];
  // Add click listeners to squares
  squares[i].addEventListener('click', function() {
    // Grap picked color
    var clickedColor = this.style.backgroundColor;
    // Compare clicked color to picked color
    if (clickedColor === pickedColor) {
      message.textContent = 'You champ!';
      scream.textContent = 'Winner!';
      changeColors(pickedColor);
      scream.style.color = 'white';
      scream.textContent = 'Winner';
      scream.classList.add('scream-now');
      setTimeout(function() {
        scream.classList.remove('scream-now');
      }, 600);
      resetBtn.textContent = 'Play again?';
    } else {
      this.style.backgroundColor = document.body.style.backgroundColor;
      message.textContent = 'Pffs! Lame!';
      scream.textContent = 'Oh Nooo!';
      scream.classList.add('scream-now');
      setTimeout(function() {
        scream.classList.remove('scream-now');
        scream.textContent = '';
      }, 600);
    }
  });
}

// ***** ACTIONS *****
resetBtn.addEventListener('click', reset);
easyBtn.addEventListener('click', function() {
  hardBtn.classList.remove('selected');
  this.classList.add('selected');
});
hardBtn.addEventListener('click', function() {
  easyBtn.classList.remove('selected');
  this.classList.add('selected');
});

// ***** COLOR TO GUESS *****
guess.textContent = pickedColor;

// ***** FUNCTIONS *****
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
  colors = generateRandomColors(6);
  pickedColor = pickColor();
  guess.textContent = pickedColor;
  body.style.backgroundColor = '';
  for (let i = 0; i < colors.length; i++) {
    squares[i].style.backgroundColor = colors[i];
  }
  resetBtn.textContent = 'New Colors';
  message.textContent = '';
  scream.textContent = '';
  scream.style.color = '';
}
