class CartesianEnemy {
  constructor(ctx, canvasSize, x, y, id) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.destroy = false;
    this.id = id;
  }

  draw() {

     
      this.ctx = game.ctx;
      this.ctx.fillStyle = "#003300";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
   
/*
    if (this.id % 2 == 0) {
      this.ctx = game.ctx;
      this.ctx.fillStyle = "#003300";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    } else {
      this.ctx = game.ctx;
      this.ctx.fillStyle = "#009900";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    */
  }
}
