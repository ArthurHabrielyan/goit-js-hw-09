const startColorChange = document.querySelector('button[data-start]');
const stopColorChange = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let inProgress = false;
let interval = null;

startColorChange.addEventListener('click', startOfDisplayChange);

stopColorChange.addEventListener('click', stopOfDisplayChange);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function displayTime() {
  document.body.style.background = getRandomHexColor();
}
function startOfDisplayChange() {
  if (inProgress) {
    return;
  }
  interval = setInterval(displayTime, 1000);
  inProgress = true;
  startColorChange.setAttribute('disabled', true);
}

function stopOfDisplayChange() {
  clearInterval(interval);
  inProgress = false;
  startColorChange.removeAttribute('disabled');
}
