let player = document.getElementById("player");
let x = 140;
let y = 140;
let speed = 15;

function updatePosition() {
  x = Math.max(0, Math.min(280, x));
  y = Math.max(0, Math.min(280, y));

  player.style.left = x + "px";
  player.style.top = y + "px";
}

function moveUp() {
  y -= speed;
  updatePosition();
}

function moveDown() {
  y += speed;
  updatePosition();
}

function moveLeft() {
  x -= speed;
  updatePosition();
}

function moveRight() {
  x += speed;
  updatePosition();
}

document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowUp") moveUp();
  if (e.key === "ArrowDown") moveDown();
  if (e.key === "ArrowLeft") moveLeft();
  if (e.key === "ArrowRight") moveRight();
});

