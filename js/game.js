let myCanvas = document.getElementById("break");
let ctx = myCanvas.getContext("2d");
let LEVEL = 1;
let LIFE = 3;
const max_level = 3;
let SCORE = 0;
const main_img = new Image();
main_img.src = "imgs/bg.jpg"


const LEVEL_IMG = new Image();
LEVEL_IMG.src = "./imgs/levels.jpg";

const LIFE_IMG = new Image();
LIFE_IMG.src = "./imgs/life.png";
LIFE_IMG.style = "margin:20px;"

const SCORE_IMG = new Image();
SCORE_IMG.src = "./imgs/score.gif";

// show game stats
function showGameStats(text, textX, textY, img, imgX, imgY) {
    // draw text
    ctx.fillStyle = "#FFF";
    ctx.font = "25px Germania One";
    ctx.fillText(text, textX, textY);

    // draw image
    // ctx.drawImage(img, imgX, imgY, 30, 30);
}


function draw() {

    // draw bricks
    drawBricks();

    // SHOW SCORE
    showGameStats(SCORE, 35, 25, SCORE_IMG, 5, 5);
    // SHOW LIVES
    ctx.drawImage(LIFE_IMG, 610, 10, 30, 30);
    ctx.drawImage(LIFE_IMG, 570, 10, 30, 30);
    ctx.drawImage(LIFE_IMG, 530, 10, 30, 30);
    //showGameStats(LIFE, cvs.width - 25, 25, LIFE_IMG, cvs.width-55, 5); 
    // SHOW LEVEL
    showGameStats(LEVEL, myCanvas.width / 2, 25, LEVEL_IMG, myCanvas.width / 2 - 30, 5);
}

function loop() {

    ctx.drawImage(main_img, 0, 0, 650, 850);
    draw();
    ballBricksCollision();
    requestAnimationFrame(loop);
}
loop();
// paddle 
// create paddle
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const PADDLE_MARGIN_BOTTOM = 10;
const paddle = {
        x: myCanvas.width / 2 - PADDLE_WIDTH / 2,
        y: myCanvas.height - PADDLE_HEIGHT - PADDLE_MARGIN_BOTTOM,
        width: PADDLE_WIDTH,
        height: PADDLE_HEIGHT,
        dx: 5,
    }
    // paddle.x
    // paddle.y
    // paddle.width
    // paddle.height
    // paddle.dx
    //  drowing paddle
function drawPaddle() {
    ctx.fillStyle = "gray";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.stockstyle = "yellow";
    ctx.strokeRect(paddle.x, paddle.y, paddle.width, paddle.height);

}
// drawPaddle()
// moving paddle
let leftArrow = false;
let rightArrow = false;
document.addEventListener("keydown", function(e) {
    console.log(e.keyCode == 37)
    if (e.keyCode == 37) {
        leftArrow = true;

    } else if (e.keyCode == 39) {
        rightArrow = true;

    }
});
document.addEventListener("keyup", function(event) {
    if (event.keyCode == 37) {
        leftArrow = false;

    } else if (event.keyCode == 39) {
        rightArrow = false;

    }

});


function movePaddle() {
    if (rightArrow) {
        paddle.x += paddle.dx;

    } else if (leftArrow && paddle.x > 0) {
        paddle.x -= paddle.dx;
    }

}


function loops() {
    // ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    drawPaddle();
    movePaddle();
    // console.log("loopj")
    requestAnimationFrame(loops);
}
loops();