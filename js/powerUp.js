class PowerUp {
    constructor(ctx, canvasSize){
        // canvas
        this.ctx = ctx;
        this.canvasSize = canvasSize

        // powerUp dimensions
        this.height = 20
        this.width = 20

        // powerUp position
        this.x = 100
        this.y = 100

        this.speed = 5   
    }

    moveTo(){
        this.y += this.speed
    }

    draw(){
        this.ctx = game.ctx
        this.ctx.fillStyle = 'red'
        game.ctx.fillRect(game.powerUp[0].x, game.powerUp[0].y, game.powerUp[0].width, game.powerUp[0].height)
        this.moveTo()
    }
}