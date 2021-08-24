class Bullet {
    constructor(ctx, canvasSize) {
        this.ctx = ctx;
        this.canvasSize = canvasSize
        this.y = ship.y
        this.height = 13
        this.width = 13
        this.x = (ship.x + ship.width/2) - this.width / 2
        this.speed = 20
        this.isZoom = false
    }

    move() {
        this.y += -1 * this.speed
    }

    draw(){
        if (!ship.isPowerUp){
            this.ctx.fillStyle = 'green'
            game.ctx.fillRect(ship.ammunition[0].x, ship.ammunition[0].y, ship.ammunition[0].width, ship.ammunition[0].height)
            this.move()

        } else {
            this.ctx.fillStyle = 'orange'
            game.ctx.fillRect(ship.ammunition[0].x, ship.ammunition[0].y, ship.ammunition[0].width, ship.ammunition[0].height)
            this.move()
            game.ctx.fillRect(ship.ammunition[0].x, ship.ammunition[0].y, ship.ammunition[0].width, ship.ammunition[0].height)
            this.move()
            game.ctx.fillRect(ship.ammunition[0].x, ship.ammunition[0].y, ship.ammunition[0].width, ship.ammunition[0].height)
            this.move()
        }
    }

    

    // zoomOut(){
        
    //     this.height = 3;
    //     this.width = 3
        
    // }

    drawZoomOut(){
        this.ctx = game.ctx
        this.ctx.fillStyle = 'orange'
        this.ctx.fillRect(this.x+6, this.y, this.height, this.width)
        this.move()
        this.isZoom = true
    }

}