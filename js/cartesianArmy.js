class CartesianArmy {
  constructor(ctx, canvasSize) {
    this.ctx = ctx;
    this.canvasSize = canvasSize;
    this.arrCartesianEnemies = [];
    this.isOrientationRigth = true;
  }


  movH(){

    if (this.isOrientationRigth){

      for (let i = 0; i < this.arrCartesianEnemies.length; i++) {
        this.arrCartesianEnemies[i].x += 5; 
      }
    }
    else {

      for (let i = 0; i < this.arrCartesianEnemies.length; i++) {
        this.arrCartesianEnemies[i].x -= 5; 
      }
    }
  }

  movDown() {
    for (let i = 0; i < this.arrCartesianEnemies.length; i++) {

      this.arrCartesianEnemies[i].y += 10;
    }
  }
  
  checkMov() {

    for (let i = 0; i < this.arrCartesianEnemies.length; i++) {

        if ((this.arrCartesianEnemies[i].x + 5 > this.canvasSize.w-20) && this.isOrientationRigth) {

          this.isOrientationRigth = false;
          return false;
          
        }
        else if ((this.arrCartesianEnemies[i].x - 5 < 0) && this.isOrientationRigth == false){

          this.isOrientationRigth = true;
          return false;
          
        }
    }
    return true;
  }

  movArmy(){
   
    if (this.checkMov() == true){
      this.movH();
    }
    else{
      this.movDown();
    }
  }

  recruit() {

    for (let i = 0; i < 6; i++) {
      this.arrCartesianEnemies.push(
        new CartesianEnemy(this.ctx, this.canvasSize, i * 50, 50, 1)
      );
      this.arrCartesianEnemies.push(
        new CartesianEnemy(this.ctx, this.canvasSize, i * 50, 100, 2)
      );
      this.arrCartesianEnemies.push(
        new CartesianEnemy(this.ctx, this.canvasSize, i * 50, 150, 3)
      );
      this.arrCartesianEnemies.push(
        new CartesianEnemy(this.ctx, this.canvasSize, i * 50, 200, 4)
      );
    }
  }

  draw() {
    for (let i = 0; i < this.arrCartesianEnemies.length; i++) {
      this.arrCartesianEnemies[i].draw();
    }
  }
}
