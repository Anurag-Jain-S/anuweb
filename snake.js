document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');
    const box = 20;
    const canvasSize = 400;

    let snake = [{ x: 10, y: 10 }];
    let food = { x: 15, y: 15 };
    let direction = 'right';

    function draw() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        // Draw the snake
        ctx.fillStyle = 'green';
        for (let i = 0; i < snake.length; i++) {
            ctx.fillRect(snake[i].x * box, snake[i].y * box, box, box);
        }

        // Draw the food
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * box, food.y * box, box, box);
    }

    function move() {
        const head = { ...snake[0] };

        // Update the direction
        document.addEventListener('keydown', function (event) {
            if (event.code === 'ArrowUp' && direction !== 'down') {
                direction = 'up';
            } else if (event.code === 'ArrowDown' && direction !== 'up') {
                direction = 'down';
            } else if (event.code === 'ArrowLeft' && direction !== 'right') {
                direction = 'left';
            } else if (event.code === 'ArrowRight' && direction !== 'left') {
                direction = 'right';
            }
        });

        // Move the snake
        if (direction === 'up') head.y -= 1;
        if (direction === 'down') head.y += 1;
        if (direction === 'left') head.x -= 1;
        if (direction === 'right') head.x += 1;

        snake.unshift(head);

        // Check for collision with food
        if (head.x === food.x && head.y === food.y) {
            // Generate new food
            food = {
                x: Math.floor(Math.random() * (canvasSize / box)),
                y: Math.floor(Math.random() * (canvasSize / box))
            };
        } else {
            // Remove the last segment of the snake
            snake.pop();
        }
    }

    function checkCollision() {
        const head = snake[0];

        // Check for collision with walls
        if (head.x < 0 || head.x >= canvasSize / box || head.y < 0 || head.y >= canvasSize / box) {
            clearInterval(gameInterval);
            alert('Game Over! You hit the wall.');
        }

        // Check for collision with itself
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                clearInterval(gameInterval);
                alert('Game Over! You collided with yourself.');
            }
        }
    }

    function gameLoop() {
        move();
        checkCollision();
        draw();
    }

    // Start the game loop
    const gameInterval = setInterval(gameLoop, 100);
});
