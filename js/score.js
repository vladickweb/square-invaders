class Score {
    constructor(ctx, canvasSize, color){
        this.ctx = ctx,
        this.canvasSize = canvasSize,
        this.color = color
        
    }



    draw(){
        this.ctx.fillStyle = this.color
        this.ctx.font = '35px space invaders Regular';
        this.ctx.fillText(`SCORE ${game.counterPoints}!`, 10, 50)
    }



}
    
    
