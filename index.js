const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const playerWidth = 10;
const playerHeight = 70;

ctx.fillStyle = '#000';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let distance = null;

const playerOne = {
    posX: 10,
    posY: 20,
    moveDirection: ''
}

const playerTwo = {
    posX: canvas.width - 20,
    posY: 20,
    moveDirection: ''
}


const ball = {
    posX: playerOne.posX + 10,
    posY: playerOne.posY + 30,
    dirX: 1,
    dirY: 0,
    angle: 0
}

const line = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
}



const draw = () => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.fillRect(playerOne.posX, playerOne.posY, playerWidth, playerHeight);
    ctx.fillRect(playerTwo.posX, playerTwo.posY, playerWidth, playerHeight);
    ctx.fillRect(ball.posX, ball.posY, 10, 10);
    // ctx.strokeStyle = '#fff';
    // ctx.beginPath();
    // ctx.moveTo(line.x1, line.y1);
    // ctx.lineTo(line.x2, line.y2);
    // ctx.stroke();
    window.requestAnimationFrame(draw);
}

const findIntersection = (ball, player) => {
    if(ball.posX - 10 === player.posX && ball.posY >= player.posY && ball.posY <= player.posY + playerHeight) {
         line.x1 = ball.posX
         line.y1 = ball.posY;
         line.x2 = player.posX;
         line.y2 = ball.posY 
         
        for(let playerY = 0; playerY <= playerHeight; playerY += 1) {
            if(ball.posY === player.posY + playerY) {
                const intersectionY = player.posY + playerY
                return {intersects: true, intersectionY};
            }
        }
   }
}

const findDistance = (ball, player) => {
    if(ball.posY >= player.posY && ball.posY <= player.posY + playerHeight) {
        line.x1 = ball.posX
        line.y1 = ball.posY;
        line.x2 = player.posX;
        line.y2 = ball.posY;

        distance = Math.sqrt(Math.pow((line.x2 - line.x1), 2) + Math.pow((line.y2 - line.y1), 2));
        // console.log(distance, moveDirection);
        if(distance > 0 && distance < 60 && player.moveDirection !== '') {
            if(player.moveDirection === 'up') {
                ball.angle = -4;
            }
            if(player.moveDirection === 'down') {
                ball.angle = 4;
            }
            console.log(ball.angle);
            moveDirection = '';
        }
        if(distance >= 60 && distance < 100 && player.moveDirection !== '') {
            if(player.moveDirection === 'up') {
                ball.angle = -2;
            }
            if(player.moveDirection === 'down') {
                ball.angle = 2;
            }
            
            console.log(ball.angle);
            player.moveDirection = '';
            // console.log(Math.cos(ball.angle));
        }
    }

}

document.addEventListener('keydown', (e) => {
    if(e.keyCode === 83) {
        playerOne.posY+=20
        playerOne.moveDirection = 'down';
    }
    if(e.keyCode === 87) {
        playerOne.posY-=20
        playerOne.moveDirection = 'up';
    }
    if(e.keyCode === 40) {
        playerTwo.posY+=20
        playerTwo.moveDirection = 'down';
    }
    if(e.keyCode === 38) {
        playerTwo.posY-=20
        playerTwo.moveDirection = 'up';
    }
})

setInterval(() => {
    if(ball.dirX === 1) {
        ball.posX += 10;
        ball.posY += 1 * ball.angle;
        const intersection =  findIntersection(ball, playerTwo);
        findDistance(ball, playerTwo);
        intersection && intersection.intersects ? ball.dirX = -1 : null;
        // dirY ? ball.dirY = dirY : null;
    }
    if(ball.dirX === -1) {
        ball.posX -= 10;
        ball.posY += 1 * ball.angle;
        const intersection = findIntersection(ball, playerOne);
        findDistance(ball, playerOne);
        intersection && intersection.intersects ? ball.dirX = 1 : null;
    }
    // if(ball.dirY === 1) {
    //     ball.posY -=10;
    // }
    // if(ball.dirY === -1) {
    //     ball.posY +=10;
    // }
}, 30)

window.requestAnimationFrame(draw);