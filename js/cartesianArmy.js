class CartesianArmy {
  constructor(ctx, canvasSize) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.arrCartesianEnemies = [];
    this.orientation = true; //right
    this.velocity = 15;
  }

  checkMov() {
    for (let i = 0; i < this.arrCartesianEnemies.length; i++) {
      if (this.orientation) {
        if (this.arrCartesianEnemies[i].x + 10 >= this.canvasSize.w) {
          this.movDown();

          //console.log ("ARMY DOWN!!")

          this.orientation = false;
        } else {
          this.movRight();
          //console.log ("ARMY RIGHT!!")
        }
      } else {
        if (this.arrCartesianEnemies[i].x - 10 <= 0) {
          //this.arrCartesianEnemies.movDown();
          this.movDown();
          //console.log ("ARMY DOWN!!")
          this.orientation = true;
        } else {
          //this.arrCartesianEnemies.moveLeft();
          this.movLeft();
          //console.log ("ARMY LEFT!!")
        }
      }
    }
  }

  movRight() {
    for (let i = 0; i < this.arrCartesianEnemies.length; i++) {
      this.arrCartesianEnemies[i].x++; //+= this.velocity;
    }
  }
  movLeft() {
    for (let i = 0; i < this.arrCartesianEnemies.length; i++) {
      this.arrCartesianEnemies[i].x--; //-= this.velocity;
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
