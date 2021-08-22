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

        this.speed = 5;
        this.powerUpSpeed = 9;
        this.ammunition = []
    };

    init(){

    }

    draw(){
        this.ctx = game.ctx 
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
        // this.ctx.fillRect(this.ammunition[0].x, this.ammunition[0].y, this.ammunition[0].width, this.ammunition[0].height)
        // console.log('ship.draw()')
    }

    isAmmunition(){
        if(this.ammunition[0]){
            this.ammunition[0].draw()
            
        } 
    }

    shoot(){
        for (let i = 0; i <= this.ammunition.length ; i++){
            console.log(this.ammunition.length);
            if (this.ammunition.length === 0){
                // console.log('entro al if')
                this.ammunition.push(new Bullet(this.ctx, this.canvasSize))

                console.log(this.ammunition.length)
            } 

            
        }
        
    }

    moveRight(){
        this.x <= game.canvasSize.w -30 ? this.x += this.speed : null
    }

    powerUpEffect(){
        if (this.isPowerUp){
            this.speed = this.powerUpSpeed
            setTimeout(() => {
                this.isPowerUp = false;
                this.speed = 5
            }, 10000)
        } 
    }


    moveLeft(){
        this.x >= 30 ? this.x -= this.speed : null
    }






}



