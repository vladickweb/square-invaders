class Ship {
    constructor (ctx, canvasSize){
        // Canvas
        this.ctx = ctx;
        this.canvasSize = canvasSize;
                
        // Ship Dimensions
        this.height = 10; 
        this.width = 50;

        // Ship Position
        this.marginBottomShip = 20;
        this.yPositionFixed = game.canvasSize.h - (this.height + this.marginBottomShip);
        this.y = this.yPositionFixed;
        this.xPosition = game.canvasSize.w/2-(this.width/2)
        this.x = this.xPosition ;  

        // Collision
        this.isDestroyed = false;  

        // Power Up  
        this.isPowerUp = false

        this.speed = 8;
        this.powerUpSpeed = 9;
        this.ammunition = []
    };

    init(){

    }

    draw(){
        if (!this.isDestroyed){
            this.ctx = game.ctx 
            this.ctx.fillStyle = 'red'
            this.ctx.fillRect(this.x, this.y, this.width, this.height)

        }else {
            this.ctx = game.ctx 
            this.ctx.fillStyle = 'black'
            this.ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    isAmmunition(){
        if(this.ammunition[0]){
            this.ammunition[0].draw()
        } 
    }

    createPowerBullets(){
        this.ammunition.push(new Bullet(this.ctx, this.canvasSize))
    }
    
    createBullet(){
        if (this.ammunition.length === 0){
            this.ammunition.push(new Bullet(this.ctx, this.canvasSize))
        }
    }

    moveRight(){
        this.x <= game.canvasSize.w -30 ? this.x += this.speed : null
    }

   


    moveLeft(){
        this.x >= 30 ? this.x -= this.speed : null
    }






}



