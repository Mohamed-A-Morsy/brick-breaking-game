let myCanvas = document.getElementById("break");
let ctx = myCanvas.getContext("2d");
let LEVEL=1;
let LIFE = 3;
const max_level =3;
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
function showGameStats(text, textX, textY, img, imgX, imgY){
    // draw text
    ctx.fillStyle = "#FFF";
    ctx.font = "25px Germania One";
    ctx.fillText(text, textX, textY);
    
    // draw image
    ctx.drawImage(img, imgX, imgY, 30, 30);
}


function draw(){

     // SHOW SCORE
     showGameStats(SCORE, 35, 25, SCORE_IMG, 5, 5);
     // SHOW LIVES
     ctx.drawImage(LIFE_IMG, 610, 10, 30, 30);
     ctx.drawImage(LIFE_IMG, 570, 10, 30, 30);
     ctx.drawImage(LIFE_IMG, 530, 10, 30, 30);
     //showGameStats(LIFE, cvs.width - 25, 25, LIFE_IMG, cvs.width-55, 5); 
     // SHOW LEVEL
    showGameStats(LEVEL, myCanvas.width/2, 25, LEVEL_IMG, myCanvas.width/2 - 30, 5);
}
function loop()
{
   ctx.drawImage(main_img,0,0,650,850);
    draw()
    requestAnimationFrame(loop);
}
loop();





















