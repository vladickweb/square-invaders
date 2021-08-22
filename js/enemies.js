class  Enemies{
    constructor(ctx, canvasSize, x, speedX, speedY, height, width, direction, rightLimit, leftLimit, randomSign) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.x = x
        this.y = 0
        this.height = height
        this.width = width
        this.speedX = speedX       //15
        this.speedY = 6
        this.direction = direction
        this.gravity = 10      //10
        this.rightLimit = rightLimit
        this.leftLimit = leftLimit
        this.randomSign = randomSign
        this.changedSpeed = undefined

    }

 

    // moveTo(){
    //     this.y += this.speedY

    //     if(this.x > 0 && this.x < this.leftLimit){
    //         this.x += this.speedX

    //         if (this.x > 3* this.rightLimit){
    //             console.log('entro al if')
    //             this.speedX -= this.gravity
    //             this.x += this.speedX
    //         }


    //         else if (this.x <  this.leftLimit) {
    //             console.log('entro al else')
    //             this.speedX += this.gravity
                
    //             this.x += this.speedX
    //         }

    //     }
    // }
    moveTo(){
        this.y += this.speedY
        this.x += this.speedX

        if (this.x > 2* this.canvasSize.w /4){
            console.log('entro al if')
            this.speedX -= this.gravity
            this.x += this.speedX
        }


        else if (this.x <  this.canvasSize.w / 4) {
            console.log('entro al else')
            this.speedX += this.gravity
            
            this.x += this.speedX
        }
    }
        



    draw(){
        // console.log('DIBUJO ENEMIGOS')
        this.ctx = game.ctx
        this.ctx.fillStyle = 'yellow'
        game.ctx.fillRect(game.enemies[0].x, game.enemies[0].y, game.enemies[0].width, game.enemies[0].height)
        this.moveTo()
    }
}