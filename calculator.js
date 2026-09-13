const buttons = document.querySelectorAll('button');

for (button of buttons) {
    button.addEventListener('click', () => {
  // Check if browser supports the API
  if ('vibrate' in navigator) {
    navigator.vibrate(40); // Short 40ms tap
  }
});
}