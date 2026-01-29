// Game variables
let player = document.getElementById('player');
let gameArea = document.getElementById('game-area');
let scoreDisplay = document.getElementById('score');
let gameOverDisplay = document.getElementById('game-over');
let restartBtn = document.getElementById('restart');
let leftBtn = document.getElementById('left-btn');
let rightBtn = document.getElementById('right-btn');

let playerPos = 50; // Percentage position (0-100)
let score = 0;
let gameRunning = true;
let enemies = [];
let collectibles = [];
let gameLoop;

// Player movement speed
const moveSpeed = 5;

// Game area dimensions
const gameWidth = gameArea.offsetWidth;
const gameHeight = gameArea.offsetHeight;

// Initialize game
function initGame() {
    playerPos = 50;
    score = 0;
    gameRunning = true;
    enemies = [];
    collectibles = [];
    scoreDisplay.textContent = 'Score: 0';
    gameOverDisplay.classList.add('hidden');
    updatePlayerPosition();
    clearInterval(gameLoop);
    gameLoop = setInterval(updateGame, 50); // Game loop every 50ms
}

// Update player position
function updatePlayerPosition() {
    player.style.left = `${playerPos}%`;
}

// Move player left
function moveLeft() {
    if (gameRunning && playerPos > 0) {
        playerPos -= moveSpeed;
        updatePlayerPosition();
    }
}

// Move player right
function moveRight() {
    if (gameRunning && playerPos < 100) {
        playerPos += moveSpeed;
        updatePlayerPosition();
    }
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        moveLeft();
    } else if (e.key === 'ArrowRight') {
        moveRight();
    }
});

// Touch controls
leftBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveLeft();
});
rightBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveRight();
});

// Spawn enemy
function spawnEnemy() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = `${Math.random() * 90}%`; // Random horizontal position
    enemy.style.top = '-30px'; // Start above screen
    gameArea.appendChild(enemy);
    enemies.push({ element: enemy, y: -30 });
}

// Spawn collectible
function spawnCollectible() {
    const collectible = document.createElement('div');
    collectible.classList.add('collectible');
    collectible.style.left = `${Math.random() * 90}%`;
    collectible.style.top = '-20px';
    gameArea.appendChild(collectible);
    collectibles.push({ element: collectible, y: -20 });
}

// Check collision
function checkCollision(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

// Update game
function updateGame() {
    if (!gameRunning) return;

    // Move enemies
    enemies.forEach((enemy, index) => {
        enemy.y += 3; // Move down
        enemy.element.style.top = `${enemy.y}px`;
        if (enemy.y > gameHeight) {
            enemy.element.remove();
            enemies.splice(index, 1);
        } else {
            // Check collision with player
            const playerRect = player.getBoundingClientRect();
            const enemyRect = enemy.element.getBoundingClientRect();
            if (checkCollision(playerRect, enemyRect)) {
                gameOver();
            }
        }
    });

    // Move collectibles
    collectibles.forEach((collectible, index) => {
        collectible.y += 2; // Move down slower
        collectible.element.style.top = `${collectible.y}px`;
        if (collectible.y > gameHeight) {
            collectible.element.remove();
            collectibles.splice(index, 1);
        } else {
            // Check collection
            const playerRect = player.getBoundingClientRect();
            const collectibleRect = collectible.element.getBoundingClientRect();
            if (checkCollision(playerRect, collectibleRect)) {
                score += 10;
                scoreDisplay.textContent = `Score: ${score}`;
                collectible.element.remove();
                collectibles.splice(index, 1);
            }
        }
    });

    // Randomly spawn enemies and collectibles
    if (Math.random() < 0.02) spawnEnemy(); // 2% chance per frame
    if (Math.random() < 0.01) spawnCollectible(); // 1% chance per frame
}

// Game over
function gameOver() {
    gameRunning = false;
    clearInterval(gameLoop);
    gameOverDisplay.classList.remove('hidden');
}

// Restart game
restartBtn.addEventListener('click', initGame);

// Start game
initGame();

