const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const message = document.getElementById('message');

let startTime, endTime, timeoutID;
let currentColor;

const FPS = 60;

function startGame() {
  message.textContent = 'Wait for it...';
  context.fillStyle = 'skyblue';
  context.fillRect(0, 0, canvas.width, canvas.height);

  const randomDelay = Math.floor(Math.random() * 5000) + 2000; // Random delay between 2-7 seconds

  timeoutID = setTimeout(() => {
    if (Math.random() < 0.5) {
      currentColor = 'green';
    } else {
      currentColor = 'red';
    }
    context.fillStyle = currentColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    startTime = performance.now();
    document.addEventListener('keydown', measureReaction);
  }, randomDelay);
}

function measureReaction(event) {
  endTime = performance.now();
  const reactionTimeMs = endTime - startTime;
  const reactionTimeFrames = (reactionTimeMs / 1000 * FPS).toFixed(2);

  if ((currentColor === 'green' && event.key === '1') || (currentColor === 'red' && event.key === '2')) {
    message.textContent = `Your reaction time is ${reactionTimeFrames} frames(${reactionTimeMs.toFixed(1)} ms).`;
  } else {
    message.textContent = `Wrong key!`;
  }

  document.removeEventListener('keydown', measureReaction);
  clearTimeout(timeoutID);
}

startButton.addEventListener('click', startGame);