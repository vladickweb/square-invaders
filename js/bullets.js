class Bullet {
    constructor(ctx, canvasSize) {
        this.ctx = ctx;
        this.canvasSize = canvasSize
        this.x = (game.ship.x+game.ship.width/2)-5;
        this.y = (game.ship.y)-10
        this.height = 12
        this.width = 12
       
    }
    move() {

        this.y -= 20
    }
    draw(){

        this.ctx = game.ctx;
        this.ctx.fillStyle = 'yellow';
        game.ctx.fillRect(this.x, this.y, this.height, this.width);
        this.move();
    }
}