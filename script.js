const gameArea = document.getElementById("gameArea");
const basket = document.getElementById("basket");
const scoreDisplay = document.getElementById("score");
let score = 0;

// Basket starting position
let basketX = window.innerWidth / 2;
basket.style.left = basketX + "px";

// Basket movement
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    basketX = Math.max(0, basketX - 30);
  }
  if (e.key === "ArrowRight") {
    basketX = Math.min(window.innerWidth - basket.offsetWidth, basketX + 30);
  }
  basket.style.left = basketX + "px";
});

// Fruit emojis
const fruits = ["🍎", "🍌", "🍊", "🍇", "🍓", "🍍"];

// Create falling fruit
function createObject() {
  const obj = document.createElement("div");
  obj.classList.add("object");
  obj.textContent = fruits[Math.floor(Math.random() * fruits.length)];
  obj.style.left = Math.random() * (window.innerWidth - 40) + "px";
  obj.style.top = "0px";
  gameArea.appendChild(obj);

  let fallInterval = setInterval(() => {
    let objTop = parseInt(obj.style.top);
    obj.style.top = objTop + 5 + "px";

    // Collision detection
    let basketRect = basket.getBoundingClientRect();
    let objRect = obj.getBoundingClientRect();

    if (
      objRect.bottom >= basketRect.top &&
      objRect.left < basketRect.right &&
      objRect.right > basketRect.left
    ) {
      score++;
      scoreDisplay.textContent = "Score: " + score;
      obj.remove();
      clearInterval(fallInterval);

      // ✅ Win condition check goes RIGHT HERE
      if (score >= 10) {
        endGame("🎉 You Win! 🎉");
      }
    }

    // Remove if it falls out of screen
    if (objTop > window.innerHeight) {
      obj.remove();
      clearInterval(fallInterval);
    }
  }, 30);
}

// Drop fruits every 1 second
let gameInterval = setInterval(createObject, 1000);

// Stop the game
function endGame(message) {
  clearInterval(gameInterval); // stop creating new fruits
  scoreDisplay.textContent = message; // show win message
}
