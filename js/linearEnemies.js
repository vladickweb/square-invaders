class LinearEnemies {
    constructor(ctx, canvasSize, speed, size, color, position) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.speed = speed
        this.size = size
        this.color = color
        this.x = position
        this.y = 0
    }

    move() {
        this.y += this.speed
    }

    draw() {
        this.ctx = game.ctx
        this.ctx.fillStyle = this.color
        this.ctx.fillRect(this.x, this.y, this.size, this.size)
        this.move()
    }
}