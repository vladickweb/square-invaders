class Score {
    constructor(ctx, canvasSize, color){
        this.ctx = ctx,
        this.canvasSize = canvasSize,
        this.color = color
        
    }



    draw(){
        this.ctx.font = '30px space_invaders';
        this.ctx.fillText(`SCORE ${game.counterPoints}!`, 10, 50)
    }



}
    
    
