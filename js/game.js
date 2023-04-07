// GAME VARIABLES AND CONSTANTS
let myCanvas = document.getElementById("break");
let ctx = myCanvas.getContext("2d");
let LEVEL = 1;
let LIFE = 3;
let GAME_OVER = false;
let isLevelDone = true;
const max_level = 3;
let SCORE = 0;
const SCORE_UNIT = 10;
const BALL_RADIUS = 8;

//----------------------------------Sounds-------------------------------------------
const Wall_Hit  = new Audio();
Wall_Hit.src="./sounds/wall.mp3"
Wall_Hit.play();
//-----------------------------------Ball Paddle collision-------------------------------------------
const Paddle_Hit = new Audio();
Paddle_Hit.src="./sounds/paddle_hit.mp3"
//---------------------------------------End--------------------------------------------------
//-----------------------------------Life lost-------------------------------------------
const Life_Lost = new Audio();
Life_Lost.src="./sounds/life_lost.mp3"
//---------------------------------------End--------------------------------------------------
//-----------------------------------Ball brick collision-------------------------------------------
const Brick_Hit = new Audio();
Brick_Hit.src="./sounds/brick_hit.mp3"
//---------------------------------------End--------------------------------------------------
//-----------------------------------win game-------------------------------------------
const Win= new Audio();
Win.src="./sounds/win.mp3"
//---------------------------------------End--------------------------------------------------
//---------------------------------------End Sounds--------------------------------------------------

const main_img = new Image();
main_img.src = "imgs/bg.jpg"

const LEVEL_IMG = new Image();
LEVEL_IMG.src = "./imgs/level.png";

const LIFE_IMG = new Image();
LIFE_IMG.src = "./imgs/life.png";
LIFE_IMG.style = "margin:20px;"

const SCORE_IMG = new Image();
SCORE_IMG.src = "./imgs/heart.jpg";

// show game stats
function showGameStats(text, textX, textY, img, imgX, imgY) {
    // draw text
    ctx.fillStyle = "#FFF";
    ctx.font = "25px Germania One";
    ctx.fillText(text, textX, textY);

    // draw image
    ctx.drawImage(img, imgX, imgY, 25, 25);
}


function draw() {

    // draw bricks
    drawBricks();

    // SHOW SCORE
    showGameStats(SCORE, 35, 25, SCORE_IMG, 5, 5);
    // SHOW LIVES
    // ctx.drawImage(LIFE_IMG, 610, 10, 30, 30);
    // ctx.drawImage(LIFE_IMG, 570, 10, 30, 30);
    // ctx.drawImage(LIFE_IMG, 530, 10, 30, 30);
    showGameStats(LIFE, myCanvas.width - 25, 25, LIFE_IMG, myCanvas.width-55, 5); 

    // SHOW LEVEL
    showGameStats(LEVEL, myCanvas.width /2, 25, LEVEL_IMG, myCanvas.width / 2 - 30, 5);
}


// paddle 
// create paddle
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 10;
const PADDLE_MARGIN_BOTTOM = 60;
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

    if(rightArrow && paddle.x + paddle.width < myCanvas.width){
        paddle.x += paddle.dx;
    }else if(leftArrow && paddle.x > 0){
        paddle.x -= paddle.dx;
    }
}
//---------------------------------------Declaration Ball-----------------------------------------------
const ball ={
    x:myCanvas.width / 2 ,
    y:paddle.y-BALL_RADIUS,
    radius:BALL_RADIUS,
    speed:4,
    dx: 3 * (Math.random()* 2-1),
    dy:-3,
   } 
//----------------------------------------------End-----------------------------------------------------
//-------------------------------------------Draw Ball-----------------------------------------------
function drawBall(){

    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
    ctx.fillStyle="#F11749";
    ctx.fill();
    ctx.strokeStyle="#FF1900";
    ctx.stroke()
    ctx.closePath();
}
//----------------------------------------------End-----------------------------------------------------

//-----------------------------------------Move Ball----------------------------------------------------
function moveBall(){
    ball.x+=ball.dx;
    ball.y+=ball.dy;
}
//----------------------------------------------End-----------------------------------------------------
//-------------------------------to prevent the Ball to go out the canvas------------------------------
function ballWallCollision(){
    let LIFE=3;

    if(ball.x +ball.radius > myCanvas.width||ball.x-ball.radius < 0){
       ball.dx= -ball.dx;
       Wall_Hit.play();
    }

if(ball.y - ball.radius < 0){
   ball.dy = -ball.dy;
   Wall_Hit.play();

   }
if(ball.y + ball.radius > myCanvas.height ){
    LIFE--;
    Life_Lost.play();
    resetBall();
  }
}
//----------------------------------------------End-----------------------------------------------------

//----------------------------------to return ball to the first place------------------------------------------
function resetBall(){
    ball.x= myCanvas.width/2;
    ball.y= paddle.y - BALL_RADIUS;
    ball.dx= 3 * (Math.random()* 2-1);
    ball.dy=-3;
}
//----------------------------------------------End-----------------------------------------------------

//---------------------------------------to prevent Ball go enter the paddel--------------------------------------------------------------
function ballPaddleCollision(){

    if(ball.x < paddle.x + paddle.width &&
        ball.x > paddle.x &&
        ball.y < paddle.y + paddle.height &&
         ball.y > paddle.y)
{
    Paddle_Hit.play();
    let collidePoint = ball.x - (paddle.x + paddle.width/2);
    collidePoint = collidePoint /(paddle.width/2);

    let angle = collidePoint * Math.PI/3;    

    ball.dx= ball.speed * Math.sin(angle);
    ball.dy= -ball.speed * Math.cos(angle);
}
}

//----------------------------------------------Game over------------------------------------------------------
function gameOver(){
    if(LIFE<=0){
        showYouLose();
        GAME_OVER = true
    }
}
//-------------------------------------------------End--------------------------------------------------------
//-----------------------------------------------Level Up---------------------------------------

function levelUp(){
   
    for(let r=0 ; r < brick.row ; r++){
     
      for(let c=0 ; c < brick.column ; c++){
        isLevelDone = isLevelDone && !bricks[r][c].status;
      }
    }
  
    if(isLevelDone == true){
      Win.play();
      if(LEVEL >= max_level){
  
           showYouWin();
          GAME_OVER=true;
          return;
      }
  
      brick.row++;
      createBricks();
      ball.speed +=1;
      resetBall();
      LEVEL++;
    }
  
   }
  
//---------------------------------------select sound element-------------------------------------------
const soundElement =document.getElementById('sound');
soundElement.addEventListener('click',controlAudio);
function controlAudio(){
    let imgSrc = soundElement.getAttribute('src');
    let soundImg =imgSrc == "./imgs/SOUND_ON.png" ? "./imgs/SOUND_OFF.png" : "./imgs/SOUND_ON.png"
    soundElement.setAttribute("src",soundImg);
//-------------------------------sounds muted or not-------------------------------
Wall_Hit.muted = Wall_Hit.muted ? false : true ;
Paddle_Hit.muted =Paddle_Hit.muted ? false : true;
Life_Lost.muted =Life_Lost.muted ? false : true;
Brick_Hit.muted =Brick_Hit.muted ? false : true;
Win.muted =win.muted ? false : true;
}
//-----------------------------------------------ENd sounds-----------------------------------------------
//-----------------------------------------------handle game over img-------------------------------------------------------
const gameover =document.getElementById('gameover');
const youwon =document.getElementById('youwon');
const youlose =document.getElementById('youlose');
const restart =document.getElementById('restart');

//-------------------------------------------play again------------------------------------------
restart.addEventListener("click",function(){
    location.reload();
})
//-------------------------------------------------------------------------------------------------
//---------------------------------------------when you win----------------------------------------
function showYouWin(){
    gameover.style.display ="block";
    youwon.style.display="block";
}
//-------------------------------------------------------------------------------------
//---------------------------------------------when you lose----------------------------------------
function showYouLose(){
    gameover.style.display ="block";
    youlose.style.display="block";
}
//-------------------------------------------------------------------------------------
function loops() {
    // ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    ctx.drawImage(main_img, 0, 0, 650, 850);
    draw();
    drawPaddle();
    movePaddle();
    drawBall();
    draw();
    moveBall();
    ballWallCollision();
    ballPaddleCollision();
    ballBrickCollision();
    levelUp();
    gameOver();
    // console.log("loopj")
    if(!GAME_OVER){
        requestAnimationFrame(loops);
    }
}
loops();

