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
let resultOfExpression = 0;


// HAPTIC EFFECT
for (button of buttons) {
    button.addEventListener('click', () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(40);
  }
});
}

// BASIC COMPUTING LOGIC

// It's kinda complicated bit it allows compute
// our expression in right priority (multiply first,
// divide second, etc)
function applyMultiply(expForComputing) {
  while (expForComputing.indexOf('×') != -1) {
    let index = expForComputing.indexOf('×');
    let result = expForComputing[index - 1] * expForComputing[index + 1];
    expForComputing.splice(index - 1, 3, result);
  };
  return expForComputing;
};
  


function applyDivide(expForComputing) {
  while (expForComputing.indexOf('÷') != -1) {
    let index = expForComputing.indexOf('÷');
    if (expForComputing[index + 1] === 0) { expForComputing.push('ERROR') } 
    let result = expForComputing[index - 1] / expForComputing[index + 1];
    expForComputing.splice(index - 1, 3, result);
  };
  return expForComputing;
};

function applyPlus(expForComputing) {
  while (expForComputing.indexOf('+') != -1) {
    let index = expForComputing.indexOf('+');
    let result = expForComputing[index - 1] + expForComputing[index + 1];
    expForComputing.splice(index - 1, 3, result);
  };
  return expForComputing;
};

function applyMinus(expForComputing) {
  while (expForComputing.indexOf('-') != -1) {
    let index = expForComputing.indexOf('-');
    let result = expForComputing[index - 1] - expForComputing[index + 1];
    expForComputing.splice(index - 1, 3, result);
  };
  return expForComputing;
};


// WORKING BUTTONS
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

// SAME BUT FOR PHYSICAL KEYBOARD
document.addEventListener('keydown', e => {
  switch (e.key) {
    case '0':
      buttonsList[0].click();
      break;
    case '1':
      buttonsList[1].click();
      break;
    case '2':
      buttonsList[2].click();
      break;
    case '3':
      buttonsList[3].click();
      break;
    case '4':
      buttonsList[4].click();
      break;
    case '5':
      buttonsList[5].click();
      break;
    case '6':
      buttonsList[6].click();
      break;
    case '7':
      buttonsList[7].click();
      break;
    case '8':
      buttonsList[8].click();
      break;
    case '9':
      buttonsList[9].click();
      break;
    case '.':
      buttonsList[10].click();
      break;
    case '*':
      buttonsList[11].click();
      break;
    case '/':
      buttonsList[12].click();
      break;
    case '-':
      buttonsList[13].click();
      break;
    case '+':
      buttonsList[14].click();
      break;
    case 'Enter':
      buttonsList[15].click();
      break;
    case 'Escape':
      buttonsList[16].click();
      break;
    case 'Backspace':
      buttonsList[17].click();
      break;
    default:
      break;
  }
});

// HERE IS THE LOGIC FOR CALCULATOR WORKING WELL
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
    readyToNewNumber = false;
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
  let input = display.textContent;
  if (input.length <= 1 || input.length <= 2 && Number(input) < 0 || input === 'Error') {
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
  if (readyToNewNumber === true && expression.length >= 3) {
    expression.pop();
    for (button of operatorButtons) {
      button.classList.remove('pressed');
    };
    computeAndReset()
  }; 
  if (readyToNewNumber === false && expression.length >= 2) {
    expression.push(Number(display.textContent));
    for (button of operatorButtons) {
      button.classList.remove('pressed');
    };
    computeAndReset();
  };
};

function computeAndReset() {
  let expForComputing = [...expression];

  expForComputing = applyMultiply(expForComputing);
  expForComputing = applyDivide(expForComputing);
  expForComputing = applyMinus(expForComputing);
  expForComputing = applyPlus(expForComputing);

  if (expForComputing.length === 1) { 
    resultOfExpression = expForComputing[0];
    if (getDecimalLength(resultOfExpression) > 7) {
      resultOfExpression = Number(resultOfExpression.toFixed(7));
    };
  } else {
    resultOfExpression = 'Error';
  };

  expression.push('=', resultOfExpression);
  if (typeof resultOfExpression === 'number') { writeInLog() };
  readyToNewNumber = true;
  display.textContent = resultOfExpression;
  expression = [];
}

function writeInLog() {
  let expessionLog = document.createElement('p');
  expessionLog.textContent = expression.join(' ');
  if (history.childElementCount >= 8) {
    history.firstElementChild.remove();
  }
  history.appendChild(expessionLog);  
  console.log(expessionLog.textContent);
}

function getDecimalLength(number) {
  let str = number.toString();
  if (!str.includes('.')) return 0;
  return str.split('.')[1].length;
}



