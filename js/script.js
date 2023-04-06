

 // show game states


 let level =1;
 let max_level =3;


 function showGameStates(text ,textx ,texty ,img ,imgx,imgy){
  ctx.fillStyle ="#FFF";
  ctx.font="20px Germania One";
  ctx.fillText(text,textx,texty);
  ctx.drawImage(img,imgx,imgy,width=20 ,height=20);
 }
 

 // game over 

 let Game_Over=false;

 function gameOver(){
  if(life <0){
   show_lose();
    Game_Over=true;
  }
 }


 // level up function 

 function levelup(){
  let levelisdone =true;

  for(let r=0 ; r < brick.row ; r++){
   
    for(let c=0 ; c < brick.column ; c++){
      levelisdone = levelisdone && !bricks[r][c].status;
    }
  }

  if(levelisdone == true){
    win.play(); 
    if(level >= max_level){

         show_win();
        Game_Over=true;
        return;
    }

    brick.row++;
    createBricks();
    ball.speed +=1;
    resetball();
    level++;
  }

 }

// draw 

function draw(){

  drawBricks();
  drawBall();
  drawPaddle();
  // drawLife();
 
  showGameStates(score ,35 ,25 ,score_img ,5,5);

  showGameStates(life ,cvs.width -25 ,25 ,life_img ,cvs.width -55,5);

  showGameStates(level ,cvs.width/2 ,25 ,level_img ,cvs.width/2 -30,5);
 
}

function update(){
 

// move_life(life);
 moveball();
 movePaddle();
 ballwallcollision();
 ballPaddleCollision();
 ballBricksCollision();

 levelup();

 gameOver();
}

// game loop 

function loop(){

   ctx.drawImage(img,0,0);

   draw();
   update();

  if(!Game_Over){
    requestAnimationFrame(loop);
  }
}


// call methods 
loop();

movePaddle();



