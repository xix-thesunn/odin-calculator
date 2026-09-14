const buttonsList = document.querySelectorAll('button');
const buttons = Array.from(buttonsList);
const display = document.querySelector('#display');
display.textContent = '0';


// VIBRATION TEST
for (button of buttons) {
    button.addEventListener('click', () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(40);
  }
});
}

for (button of buttons) {
  if (button.classList.contains('numbers')) {
    button.addEventListener('click', e => enterTheNumber(e.target));
  }

  if (button.classList.contains('operator')) {
    button.addEventListener('click', (e) => testAlert(e));
  }

  if (button.getAttribute('id') === 'equal') {
    button.addEventListener('click', (e) => testAlert(e));
  }

  if (button.getAttribute('id') === 'clear') {
    button.addEventListener('click', () => clearDisplay());
  }

  if (button.getAttribute('id') === 'backspace') {
    button.addEventListener('click', () => backspaceFunc());
  }
}

function testAlert(e) {
  let button = e.target;
  alert('You clicked button ' + button.getAttribute('id'));
}

function enterTheNumber(button) {
  if (display.textContent === '0') {
    display.textContent = button.textContent;
  } else if (display.textContent.length < 8) {
  display.textContent += button.textContent;
  }
}

function clearDisplay() {
  display.textContent = '0';
}

function backspaceFunc() {
  if (display.textContent.length <= 1) {
    display.textContent = '0';
  } else {
  display.textContent = display.textContent.slice(0, -1);
  }
}