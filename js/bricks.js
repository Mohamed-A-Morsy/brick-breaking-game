    // create bricks 

    let score = 0;
    let score_unit = 10;
    const brick = {
        row: 2,
        column: 6,
        width: 50,
        height: 15,
        offsetleft: 40,
        offsettop: 30,
        margintop: 30,
        fillcolor: '#32105D',
        strokecolor: 'gray'
    }

    let bricks = [];

    function createBricks() {
        for (let r = 0; r < brick.row; r++) {
            bricks[r] = [];
            for (let c = 0; c < brick.column; c++) {

                if (r % 2 == 0 && c % 2 == 0) {
                    bricks[r][c] = {
                        x: c * (brick.offsetleft + brick.width) + brick.offsetleft,
                        y: r * (brick.offsettop + brick.height) + brick.offsettop + brick.margintop,
                        status: false,
                        breakable: false
                    }
                } else {
                    bricks[r][c] = {
                        x: c * (brick.offsetleft + brick.width) + brick.offsetleft,
                        y: r * (brick.offsettop + brick.height) + brick.offsettop + brick.margintop,
                        hit: 0,
                        status: true,
                        breakable: true
                    }
                }
            }
        }
    }

    createBricks();



    // draw bricks   

    function drawBricks() {



        for (let r = 0; r < brick.row; r++) {

            for (let c = 0; c < brick.column; c++) {
                const b = bricks[r][c];
                if (b.status == true && b.breakable == true) {

                    if (b.hit == 1) {
                        ctx.fillStyle = '#709c6e';

                    } else {
                        ctx.fillStyle = brick.fillcolor;
                    }

                    ctx.fillRect(b.x, b.y, brick.width, brick.height);
                } else if (b.breakable == false) {
                    // ctx.fillStyle = '#9d7bc6';
                    ctx.fillStyle = 'red';
                    ctx.fillRect(b.x, b.y, brick.width, brick.height);
                }
            }
        }
    }

    // bricks interact  

function ballBrickCollision(){


    for (let r = 0; r < brick.row; r++) {
    
        for (let c = 0; c < brick.column; c++) {
            const b = bricks[r][c];
            if (b.status == true && b.breakable == true) {
                if (ball.x + ball.radius > b.x &&
                    ball.x - ball.radius < b.x + brick.width &&
                    ball.y + ball.radius > b.y &&
                    ball.y - ball.radius < b.y + brick.height) {
                    
                    ball.dy = -ball.dy;
                    Wall_Hit.play();
                    b.hit += 1;
    
    
                    if (b.hit == 2) {
                       
                        b.status = false;
                        score += score_unit;
    
                    }
    
    
                } 
    
            } else if (b.breakable == false) {
    
                

                if (ball.x + ball.radius > b.x &&
                    ball.x - ball.radius < b.x + brick.width &&
                    ball.y + ball.radius > b.y &&
                    ball.y - ball.radius < b.y + brick.height) {
                    
                    ball.dy = -ball.dy;
                    Wall_Hit.play();
    
                   b.status =false;

    
                } 

                
    
            }
        }
    }
    
    }
