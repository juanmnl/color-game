import '../style/app.scss';

console.log('Hello Wolfpack? lol!');

let toggleLayout = document.getElementById('toggleLayout');
let screen = document.body;

toggleLayout.onclick = function() {
  screen.classList.toggle('layout');
  toggleLayout.classList.toggle('active');
};

// ***************************************
var squares = document.querySelectorAll('.square');
var h2 = document.getElementsByTagName('h2')[0];
var guess = document.getElementById('guess');
var message = document.getElementById('message');

var colors = [
  'rgb(255, 0, 0)',
  'rgb(255, 255, 0)',
  'rgb(0, 255, 0)',
  'rgb(0, 255, 255)',
  'rgb(0, 0, 255)',
  'rgb(255, 0, 255)'
];

// ***** COLORS *****
var pickedColor = pickColor();
var bodyBg = document.body.style.backgroundColor;

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
      changeColors(pickedColor);
    } else {
      this.style.display = 'none';
      message.textContent = 'Pffs! Lame!';
    }
  });
}

// ***** COLOR TO GUESS *****
guess.textContent = pickedColor;

function changeColors(color) {
  for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
  h2.style.backgroundColor = color;
}

function getRandomVal(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}
