class Ship {
    constructor (ctx, canvasSize){

        this.ctx = ctx;
        this.canvasSize = canvasSize;
        this.height = 50; 
        this.width = 50;
        this.y = 600;
        this.x = 200;
        this.isPowerUp = true
        this.ammunition = [];
        
    };
//NORMAL
    movRight(){
        this.x += 10;
    }
    movLeft(){
        this.x -=10;
    }
    shoot(){
        
        if(this.ammunition.length == 0){

            this.ammunition.push(new Bullet(this.ctx, this.canvasSize));
        }
    }
//---------     
//POWER UP
    movRightPower(){
        this.x +=20;
    }
    movLeftPower(){
        this.x -=20;
    }
    shootPower(){
        this.ammunition.push(new Bullet(this.ctx, this.canvasSize));
    }
//---------    

    draw(){
        this.ctx = game.ctx 
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    drawBullet(){
        for(let i = 0; i<this.ammunition.length; i++){

            if(this.ammunition[i].y>0){

                this.ammunition[i].draw();
            }
            else{
                this.ammunition.splice(i,1);
            }
        }
    }

}

