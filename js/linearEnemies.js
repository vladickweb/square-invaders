class LinearEnemies{
    constructor(ctx, canvasSize, speed, size, color, position){
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.speed = speed
        this.size = size
        this.color = color
        this.x = position
        this.y = 0
    }

    draw(){
        console.log('entro al draw')
        this.ctx = game.ctx
        this.ctx.fillStyle = this.color
        game.ctx.fillRect(game.linearEnemies[0].x, game.linearEnemies[0].y, game.linearEnemies[0].size, game.linearEnemies.size)
        this.move()
    }

    move(){
        console.log('entro al move')
        this.x += this.speed

    }
}