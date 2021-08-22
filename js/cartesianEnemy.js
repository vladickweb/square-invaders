class CartesianEnemy {
  constructor(ctx, canvasSize, x, y, id) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.destroy = false;
    this.id = 1;
  }

  draw() {

    this.ctx = game.ctx;
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
    

  }
}
