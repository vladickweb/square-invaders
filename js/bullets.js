class Bullet {
    constructor(ctx, canvasSize) {
        this.ctx = ctx;
        this.canvasSize = canvasSize
        this.x = ship.x
        this.y = ship.y
        this.height = ship.width
        this.width = ship.width
        this.speed = 20
    }

    move() {
        this.y += -1 * this.speed
    }

    draw(){
        this.ctx = game.ctx
        this.ctx.fillStyle = 'green'
        game.ctx.fillRect(ship.ammunition[0].x, ship.ammunition[0].y, ship.ammunition[0].width, ship.ammunition[0].height)
        this.move()
    }

}