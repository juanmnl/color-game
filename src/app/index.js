import '../style/app.scss';

console.log('Hello Wolfpack? lol!');

let date = new Date();

const root = document.getElementById('root');
root.append(date);

let toggleLayout = document.getElementById('toggleLayout');
let screen = document.body;

toggleLayout.onclick = function() {
  screen.classList.toggle('layout');
  toggleLayout.classList.toggle('active');
};
