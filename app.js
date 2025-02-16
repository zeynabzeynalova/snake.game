const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const snakeSize = 10;
let snake = [{ x: 50, y: 50 }];
let direction = "RIGHT";
let food = generateFood();
let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvas'ı temizle
    drawSnake();
    drawFood();
    moveSnake();
    checkGameOver();
    document.getElementById("score").textContent = "Skor: " + score;
}

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

function moveSnake() {
    let head = { ...snake[0] };

    if (direction === "LEFT") head.x -= snakeSize;
    if (direction === "RIGHT") head.x += snakeSize;
    if (direction === "UP") head.y -= snakeSize;
    if (direction === "DOWN") head.y += snakeSize;

    snake.unshift(head);

    // Eğer yılan yem yediyse
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    const x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
    const y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
    return { x, y };
}

function checkGameOver() {
    const head = snake[0];

    // Duvara çarpma
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        resetGame();
    }

    // Kendi kendine çarpma
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
        }
    }
}

function resetGame() {
    alert("Oyun Bitti! Skorunuz: " + score);
    snake = [{ x: 50, y: 50 }];
    direction = "RIGHT";
    score = 0;
    food = generateFood();
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function gameLoop() {
    draw();
    setTimeout(gameLoop, 100);
}

gameLoop();