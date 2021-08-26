class  ZigZagEnemies{
    constructor(ctx, canvasSize, x, speedX, speedY, height, leftLimit, color) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.x = x
        this.y = 0
        this.height = height
        this.width = this.height
        this.speedX = speedX     //15
        this.speedY = speedY
        this.gravity = .9//10
        this.leftLimit = leftLimit
        this.color = color

    }

    moveTo(){
        this.y += this.speedY
            if (this.leftLimit > this.x < this.canvasSize.w){
            this.x += this.speedX
            if (this.x > 2* this.canvasSize.w /4){
                this.speedX -= this.gravity
                this.x += this.speedX
            }
            else if (this.x <  50 +this.canvasSize.w / 4) {
                this.speedX += this.gravity
                this.x += this.speedX
            }
        }
    }
        
    

    draw(){
        // console.log('DIBUJO ENEMIGOS')
        // this.ctx = game.ctx
        this.ctx.fillStyle = this.color
        
        game.ctx.fillRect(game.zigZagEnemies[0].x, game.zigZagEnemies[0].y, game.zigZagEnemies[0].width, game.zigZagEnemies[0].height)
        this.moveTo()
    }
}