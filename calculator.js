const buttons = document.querySelectorAll('button');

for (button of buttons) {
    button.addEventListener('click', () => {
  // Check if browser supports the API
  if ('vibrate' in navigator) {
    navigator.vibrate(40); // Short 40ms tap
  }
});
}

for (button of buttons) {
  if (button.classList.contains('numbers')) {
    button.addEventListener('click', (e) => testAlert(e));
  }

  if (button.classList.contains('operator')) {
    button.addEventListener('click', (e) => testAlert(e));
  }

  if (button.getAttribute('id') === 'equal') {
    button.addEventListener('click', (e) => testAlert(e));
  }

  if (button.getAttribute('id') === 'clear') {
    button.addEventListener('click', (e) => testAlert(e));
  }

  if (button.getAttribute('id') === 'backspace') {
    button.addEventListener('click', (e) => testAlert(e));
  }
}

function testAlert(e) {
  let button = e.target;
  alert('You clicked button ' + button.getAttribute('id'));
}