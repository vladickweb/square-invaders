class PowerUp {
    constructor(ctx, canvasSize) {
        this.ctx = ctx;
        this.canvasSize = canvasSize
        this.height = 20
        this.width = 20
        this.x = 150
        this.y = 0
        this.speed = 4
    }

    moveTo() {
        this.y += this.speed
    }

    draw() {
        if (this.y % 5 === 0) {
            this.ctx = game.ctx
            this.ctx.fillStyle = 'red'
            game.ctx.fillRect(game.powerUp[0].x, game.powerUp[0].y, game.powerUp[0].width, game.powerUp[0].height)
            this.moveTo()
        } else {
            this.ctx = game.ctx
            this.ctx.fillStyle = 'white'
            game.ctx.fillRect(game.powerUp[0].x, game.powerUp[0].y, game.powerUp[0].width, game.powerUp[0].height)
            this.moveTo()
        }
    }
}