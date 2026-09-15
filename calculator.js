const buttonsList = document.querySelectorAll('button');
const buttons = Array.from(buttonsList);
const operatorButtons = buttons.filter(button => button.classList.contains('operator'));

const display = document.querySelector('#display');
display.textContent = '0';

const history = document.querySelector('.history');

// Here we will store numbers and operators, and it will
// look like: '2', '+', '2', '×', '3'.
// After pressing '=' whole expession will be computed.
let expression = [];
let readyToNewNumber = false;
let result = 0;


// HAPTIC EFFECT
for (button of buttons) {
    button.addEventListener('click', () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(40);
  }

  console.log(expression.join(''))
});
}

for (button of buttons) {
  if (button.classList.contains('numbers')) {
    button.addEventListener('click', e => enterTheNumber(e.target));
  }

  if (button.getAttribute('id') === 'point') {
    button.addEventListener('click', () => addPoint());
  }

  if (button.classList.contains('operator')) {
    button.addEventListener('click', e => operatorPressed(e.target));
  }

  if (button.getAttribute('id') === 'equal') {
    button.addEventListener('click', () => pressEqual());
  }

  if (button.getAttribute('id') === 'clear') {
    button.addEventListener('click', () => clearAll());
  }

  if (button.getAttribute('id') === 'backspace') {
    button.addEventListener('click', () => backspaceFunc());
  }
}


function enterTheNumber(button) {
  if (display.textContent === '0' || readyToNewNumber === true) {
    display.textContent = button.textContent;
    readyToNewNumber = false;
  } else if ((display.textContent.length < 8 && display.textContent.indexOf('.') === -1)
          || (display.textContent.length < 9 && display.textContent.indexOf('.') != -1)) {
  display.textContent += button.textContent;
  }
};

function addPoint() {
  if (display.textContent.indexOf('.') === -1 && display.textContent.length < 8) {
    display.textContent += '.';
  }
};

function clearAll() {
  expression = [];
  display.textContent = '0';
  for (button of operatorButtons) {
    button.classList.remove('pressed');
  };
};

function backspaceFunc() {
  if (display.textContent.length <= 1) {
    display.textContent = '0';
  } else {
  display.textContent = display.textContent.slice(0, -1);
  }
};

function operatorPressed(activeButton) {
  for (button of operatorButtons) {
    button.classList.remove('pressed');
  };
  activeButton.classList.add('pressed');

  expression.push(Number(display.textContent));
  expression.push(activeButton.textContent);

  readyToNewNumber = true;
};

function pressEqual() {
  if (expression.length >= 1) {
    if (readyToNewNumber === true) {
      expression.pop();
    } else {
      expression.push(Number(display.textContent));
    };
    for (button of operatorButtons) {
      button.classList.remove('pressed');
    };
    compute();
  }
}

function compute() {
  let expForComputing = [...expression];
  


  expression.push('=', result);
  let expessionLog = document.createElement('p');
  expessionLog.textContent = expression.join(' ');
  history.appendChild(expessionLog);  
  clearAll();
}
