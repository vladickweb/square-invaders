class  Enemies{
    constructor(ctx, canvasSize, x, speed) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.x = x
        this.y = 0
        this.height = 100
        this.width = 100
        this.speed = speed
    }

    moveTo(){
        this.y += -1 * this.speed
    }


    draw(){
        console.log('DIBUJO ENEMIGOS')
        this.ctx = game.ctx
        this.ctx.fillStyle = 'red'
        game.ctx.fillRect(game.enemies[0], game.enemies[0].y, game.enemies[0].width, game.enemies[0].height)
        this.moveTo()
    }
}