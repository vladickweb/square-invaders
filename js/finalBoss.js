class FinalBoss {

    constructor (ctx, canvasSize){

        this.ctx = ctx;
        this.canvasSize = canvasSize;
        this.height = 400; 
        this.width = 400;
        this.y = -500;
        this.x = 5.5;
        
        this.counter = 0;
        
    };
    
    move() {
            this.y += 1
        }
       
    draw(){
        this.ctx = game.ctx
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
        this.move();
    }

}