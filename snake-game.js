// snake-game.js
document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('snakeCanvas');
    const ctx = canvas.getContext('2d');

    const snakeSize = 20;
    const canvasSize = 400;
    const snake = [{ x: 10, y: 10 }];
    let direction = 'right';

    function drawSnake() {
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        ctx.fillStyle = 'green';
        snake.forEach(segment => {
            ctx.fillRect(segment.x * snakeSize, segment.y * snakeSize, snakeSize, snakeSize);
        });
    }

    function moveSnake() {
        const head = { ...snake[0] };

        switch (direction) {
            case 'up':
                head.y -= 1;
                break;
            case 'down':
                head.y += 1;
                break;
            case 'left':
                head.x -= 1;
                break;
            case 'right':
                head.x += 1;
                break;
        }

        snake.unshift(head);
    }

    function gameLoop() {
        moveSnake();
        drawSnake();
    }

    setInterval(gameLoop, 100);
});
