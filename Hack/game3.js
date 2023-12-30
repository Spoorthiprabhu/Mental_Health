const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score-value');
const difficultySelect = document.getElementById('difficulty-select');
const shooter = document.getElementById('shooter');
const startButton = document.getElementById('start-btn');
const stopButton = document.getElementById('stop-btn');
const resetButton = document.getElementById('reset-btn');

let score = 0;
let bubbleCreationInterval;

const negativeThoughts = [
  "Nobody likes me.",
  "I'm not good enough.",
  "I'll never succeed.",
  "I'm a failure.",
  "I'm worthless.",
  "I'm so alone.",
  "I'm a burden to others.",
  "I'll never be happy."
];

function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  const randomThought = negativeThoughts[Math.floor(Math.random() * negativeThoughts.length)];
  bubble.innerText = `"${randomThought}"`;
  bubble.classList.add('negative');

  const textLength = randomThought.length;

  // Set bubble size based on text length
  const bubbleSize = Math.max(40, textLength * 10); // Minimum size is 40 pixels
  bubble.style.width = `${bubbleSize}px`;
  bubble.style.height = `${bubbleSize}px`;

  bubble.style.left = `${Math.random() * (gameContainer.offsetWidth - bubbleSize)}px`;
  bubble.style.top = `${Math.random() * (gameContainer.offsetHeight - bubbleSize)}px`;

  bubble.addEventListener('click', () => {
    score += 1; // Increase the score when hitting a bubble
    scoreElement.innerText = score;
    gameContainer.removeChild(bubble);
  });

  gameContainer.appendChild(bubble);
}

function shootBubble() {
  const bullet = document.createElement('div');
  bullet.classList.add('bullet');
  bullet.style.bottom = '0';

  shooter.appendChild(bullet);

  const bulletInterval = setInterval(() => {
    const bulletBottom = parseInt(bullet.style.bottom);
    if (bulletBottom >= gameContainer.offsetHeight) {
      clearInterval(bulletInterval);
      shooter.removeChild(bullet);
    } else {
      bullet.style.bottom = `${bulletBottom + 5}px`;

      const bubbles = document.querySelectorAll('.bubble');
      bubbles.forEach(bubble => {
        if (checkCollision(bullet, bubble)) {
          score += 1; // Increase the score when hitting a bubble
          scoreElement.innerText = score;
          gameContainer.removeChild(bubble);
          shooter.removeChild(bullet);
          clearInterval(bulletInterval);
        }
      });
    }
  }, 16);
}

function startGame() {
  stopGame(); // Stop any existing game before starting a new one
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;
  const difficulty = difficultySelect.value;
  const difficultyLevels = {
    easy: 2000, // Create a new bubble every 2 seconds
    medium: 1000, // Create a new bubble every 1 second
    hard: 500 // Create a new bubble every 0.5 seconds
  };

  bubbleCreationInterval = setInterval(() => {
    createBubble();
  }, difficultyLevels[difficulty]);
}

function stopGame() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;
  clearInterval(bubbleCreationInterval);
}

function resetGame() {
  stopGame();
  score = 0;
  scoreElement.innerText = score;
}

function changeDifficulty() {
  resetGame();
}

document.addEventListener('keydown', (event) => {
  if (event.key === ' ' || event.key === 'Spacebar') {
    shootBubble();
  }
});

// Initialize the game with the default difficulty
changeDifficulty();



