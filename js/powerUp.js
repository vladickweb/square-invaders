class PowerUp {
    constructor(ctx, canvasSize, x){
        // canvas
        this.ctx = ctx;
        this.canvasSize = canvasSize

        // powerUp dimensions
        this.height = 100
        this.width = 100

        // powerUp position
        this.x = 100
        this.y = 100

        this.speed = 50   
    }

    moveTo(){
        this.x += this.speed
    }

    draw(){
        console.log('entro a la funcion de dibujar')
        this.ctx = game.ctx
        this.ctx.fillStyle = 'red'
        game.ctx.fillRect(game.powerUp[0], game.powerUp[0].y, game.powerUp[0].width, game.powerUp[0].height)
        this.moveTo()
    }
}