class CartesianArmy {
  constructor(ctx, canvasSize) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.arrCartesianEnemies = [];
    this.orientation = true; //right
    
  }

  checkMov() {

    for (let i = 0; i < this.arrCartesianEnemies.length; i++) {

      if (this.orientation) {

        if (this.arrCartesianEnemies[i].x + 1 > this.canvasSize.w-20) {
          this.movDown();
          this.orientation = false;

        } else {
          this.movRight();
          //console.log ("ARMY RIGHT!!")
        }
      } else {
        if (this.arrCartesianEnemies[i].x - 1 <= 0) {
          
          this.movDown();
          this.orientation = true;

        } else {
          this.movLeft();
         
        }
      }
    }
  }

  movRight() {
    for (let i = 0; i < this.arrCartesianEnemies.length; i++) {
      this.arrCartesianEnemies[i].x += 1; //+= this.velocity;
    }
  }
  movLeft() {
    for (let i = 0; i < this.arrCartesianEnemies.length; i++) {
      this.arrCartesianEnemies[i].x -= 1; //-= this.velocity;
    }
  }
  movDown() {
    for (let i = 0; i < this.arrCartesianEnemies.length; i++) {

      this.arrCartesianEnemies[i].y += 20; //+= this.velocity;
    }
  }

  recruit() {
    /*
    this.arrCartesianEnemies.push(
        new CartesianEnemy(this.ctx, this.canvasSize, 20, 50, 1));
        */
    //constructor(ctx, canvasSize, x, y, id)

    for (let i = 0; i < 6; i++) {
      this.arrCartesianEnemies.push(
        new CartesianEnemy(this.ctx, this.canvasSize, i * 40, 50, 1)
      );
      this.arrCartesianEnemies.push(
        new CartesianEnemy(this.ctx, this.canvasSize, i * 40, 100, 2)
      );
      this.arrCartesianEnemies.push(
        new CartesianEnemy(this.ctx, this.canvasSize, i * 40, 150, 3)
      );
      this.arrCartesianEnemies.push(
        new CartesianEnemy(this.ctx, this.canvasSize, i * 40, 200, 4)
      );
    }
    // console.log("EJERCITO RECLUTADO!!" + this.arrCartesianEnemies);
  }

  draw() {
    for (let i = 0; i < this.arrCartesianEnemies.length; i++) {
      this.arrCartesianEnemies[i].draw();
    }
  }
}
