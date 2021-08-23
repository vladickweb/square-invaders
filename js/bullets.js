class Bullet {
    constructor(ctx, canvasSize) {
        this.ctx = ctx;
        this.canvasSize = canvasSize
        this.x = ship.x +20
        this.y = ship.y
        this.height = 40
        this.width = 10
        this.speed = 20
    }

    move() {
        this.y += -1 * this.speed
    }

    draw(){
        if (!ship.isPowerUp){
            this.ctx = game.ctx
            this.ctx.fillStyle = 'green'
            game.ctx.fillRect(ship.ammunition[0].x, ship.ammunition[0].y, ship.ammunition[0].width, ship.ammunition[0].height)
            this.move()

        } else {
            this.ctx = game.ctx
            this.ctx.fillStyle = 'orange'
            game.ctx.fillRect(ship.ammunition[0].x, ship.ammunition[0].y, ship.ammunition[0].width, ship.ammunition[0].height)
            this.move()
            game.ctx.fillRect(ship.ammunition[0].x, ship.ammunition[0].y, ship.ammunition[0].width, ship.ammunition[0].height)
            this.move()
            game.ctx.fillRect(ship.ammunition[0].x, ship.ammunition[0].y, ship.ammunition[0].width, ship.ammunition[0].height)
            this.move()
            
        }
    }

}