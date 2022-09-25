const grid = document.querySelector('.grid');
const blockWidth = 100;
const blockHeigth = 20;
const boardWidth = 560;
const boardHeight = 300;
const ballDiameter = 20;

const UserStart = [230, 10];
let currentPosition = UserStart;

const ballStart = [270,40]
let currentBallPosition = ballStart

let timerId;
let xDirection = -2
let yDirection = 2

let ballSpeed = 20

const scoreDisplay = document.querySelector('#score');


/**
 * Individual block
 */
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis, blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeigth]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeigth]
    }
}

/**
 * All my blocks
 */
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
]

/**
 * Adding all blocks to destroy
 */
const addBlocks = () => {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        grid.appendChild(block)
    }
}

addBlocks();

const user = document.createElement('div')
user.classList.add('user')
grid.appendChild(user)

/**
 * Draw user
 */
const drawUser = () => {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}
drawUser()

const ball = document.createElement('div')

ball.classList.add('ball');
grid.appendChild(ball);

const drawBall = () => {
    ball.style.left = currentBallPosition[0] + 'px'
    ball.style.bottom = currentBallPosition[1] + 'px'
}

drawBall();


/**
 * Move user right and left 
 * @param {*event} e 
 */
const moveUser = (e) => {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 20) {
                currentPosition[0] -= 10
                drawUser()
            }
            break;
        case 'ArrowRight':
            if (currentPosition[0] < boardWidth - blockWidth - 20) {
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser);

const moveBall = () => {
    currentBallPosition[0] += xDirection
    currentBallPosition[1] += yDirection
    drawBall()
    checkCollisions();
}

timerId = setInterval(moveBall, ballSpeed)

const checkCollisions = () => {
    // Blocks collisions
    for (let i = 0; i < blocks.length; i++) {
        if (
            ((currentBallPosition[0] > blocks[i].bottomLeft[0]) && currentBallPosition[0] < blocks[i].bottomRight[0]) &&
            (currentBallPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && currentBallPosition[1] < blocks[i].topLeft[1] 
            
            ) {
                const allBlocks = Array.from(document.querySelectorAll('.block'))
                console.log(allBlocks)
            }
    }

    // Walls collisions
    if (
        currentBallPosition[0] >= (boardWidth - ballDiameter) || 
        currentBallPosition[1] >= (boardHeight - ballDiameter) ||
        currentBallPosition[0] <=0
        ) {
        changeDirection()
    }

    if (currentBallPosition[1] <= 0) {
        clearInterval(timerId);
        scoreDisplay.innerHTML = 'You lose';
        document.removeEventListener('keydown', moveUser)
    }
}

const changeDirection = () => {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return;
    }
    
    if (xDirection == 2 && yDirection == -2) {
        xDirection = -2;
        return;
    }

    if (xDirection == -2 && yDirection == -2) {
        yDirection = 2
        return;
    }

    if (xDirection == -2 && yDirection == 2) {
        xDirection = 2
        return;
    }

}






