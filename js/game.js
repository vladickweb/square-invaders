const game = {
  canvas: undefined,
  canvasSize: {
    h: 823,
    w: 411,
  },
  ctx: undefined,
  width: undefined,
  height: undefined,
  FPS: 60,
  framesCounter: 0,
  timeInterval: 60,

  background: undefined,

  ship: undefined,
  zigZagEnemies: [],
  linearEnemies: [],
  army: [],
  powerUp: [],
  arrColors: ["#D0aCE1", "#7219CE", "#E86F93", "#15EEF8", "#EBDE90", "#D7BD12"],
  // arrColors: ['blue', 'red', 'orange', 'yellow', 'white', 'blue'],

  aleatorySpeed: undefined,
  aleatoryX: undefined,
  aleatorySize: undefined,
  aleatoryRightLimit: undefined,
  aleatoryLeftLimit: undefined,
  randomSign: undefined,
  aleatoryGravity: undefined,
  aleatoryColor: undefined,
  counterPoints: 0,
  finalBossDamage: 0,
  score: undefined,
  restrictAddEventListener: false,
  level: undefined,
  isPlaying: false,

  initialMusic: new Audio("./assets/menuInicio.mp3"),
  // gameMusic: new Audio('./assets/sonidoJuego.mp3'),
  gameOverMusic: new Audio("./assets/gameOver.mp3"),
  powerUpSound: new Audio("./assets/cogerPowerUp.mp3"),
  laser: new Audio("./assets/laser.mp3"),
  gameSound: new Audio("./assets/sonidoJuego.mp3"),

  keys: {},

  init(id) {
    this.funInitialMusic();
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    audio = document.getElementById("audio");
    // audioz.preload = true;
    this.setDimensions();
    ship = new Ship(this.ctx, this.canvasSize);
    this.showScore();
    this.cartesianArmy = new CartesianArmy(this.ctx, this.canvasSize);
    this.cartesianArmy.recruit();
    this.finalBoss = new FinalBoss(this.ctx, this.canvasSize);
    this.initialBackground();
    this.ctx.fillStyle = "white";
    this.ctx.font = "white space invaders Regular";
    this.ctx.fillText("READY", 200, 200);
  },

  setDimensions() {
    this.width = this.canvasSize.w;
    this.height = this.canvasSize.h;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  },

  initialBackground() {
    let bgImg = new Image();
    bgImg.src = "./assets/startBackground2.jpg";
    bgImg.onload = () => {
      this.ctx.drawImage(bgImg, 0, 0, this.canvasSize.w, this.canvasSize.h);
      this.ctx.fillStyle = "white";
      this.ctx.font = " 50px space invaders Regular";
      this.ctx.fillText("READY?", 100, 200);
    };
  },

  start() {
    this.isPlaying = true;
    this.gameSound.play();
    this.gameSound.loop = true;

    interval = setInterval(() => {
      this.framesCounter > 5000
        ? (this.framesCounter = 0)
        : this.framesCounter++;
      this.clear();
      this.drawAll();
      this.cleanObjects();
      this.powerUpEffect();
      this.generatePowerUps();
      this.generateZigZagEnemies();
      this.generateLinearEnemies();
      this.isCollision();
      this.shipCollisionLinear();
      this.shipCollisionZigZag();
      this.isCollisionPowerUp();
      ship.isAmmunition();
      this.updateScore();
      this.cartesianArmy.movArmy();
      this.controls();
    }, 1000 / this.FPS);
    setInterval(() => {
      this.cartesianArmy.checkMov();
    }, 1000);
  },

  reset() {
    (game.framesCounter = 0),
      (game.ship = undefined),
      (game.zigZagEnemies = []),
      (game.linearEnemies = []),
      (game.army = []),
      (game.powerUp = []),
      (game.aleatorySpeed = undefined),
      (game.aleatoryX = undefined),
      (game.aleatorySize = undefined),
      (game.aleatoryRightLimit = undefined),
      (game.aleatoryLeftLimit = undefined),
      (game.randomSign = undefined),
      (game.aleatoryGravity = undefined),
      (game.aleatoryColor = undefined),
      (game.counterPoints = 0),
      (game.finalBossDamage = 0),
      (game.score = undefined),
      (game.restrictAddEventListener = false),
      (game.level = undefined);
    game.clear();
    game.init("my-canvas");
  },

  drawAll() {
    ship.draw();
    this.powerUp[0] ? this.powerUp[0].draw() : null;
    this.cartesianArmy.draw();
    if (
      this.cartesianArmy.arrCartesianEnemies.length === 0 &&
      this.counterPoints < 50
    ) {
      this.zigZagEnemies[0] ? this.zigZagEnemies[0].draw() : null;
      this.linearEnemies[0] ? this.linearEnemies[0].draw() : null;
    } else if (this.counterPoints >= 50) {
      this.finalBoss.draw();
      this.linearEnemies.length = 0;
      this.zigZagEnemies.length = 0;
      ship.zoomOut();
      ship.zoomOutBullet();
    }
  },

  clear() {
    this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
  },

  cleanObjects() {
    if (ship.ammunition.length > 0) {
      if (ship.ammunition[0].y < 0) {
        ship.ammunition.pop();
      }
    }

    if (this.powerUp.length > 0) {
      this.powerUp = this.powerUp.filter(
        (elm) => elm.y >= 0 && elm.y < this.canvasSize.h
      );
    }

    if (this.zigZagEnemies.length > 0) {
      this.zigZagEnemies = this.zigZagEnemies.filter(
        (elm) => elm.y >= 0 && elm.y < this.canvasSize.h
      );
    }

    if (this.linearEnemies.length > 0) {
      this.linearEnemies = this.linearEnemies.filter(
        (elm) => elm.y >= 0 && elm.y < this.canvasSize.h
      );
    }
  },

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },

  powerBullets() {
    if (this.framesCounter % 10 === 0 && this.counterPoints < 50) {
      ship.createPowerBullets();
    }
  },

  powerUpEffect() {
    if (ship.isPowerUp) {
      this.powerUpSound.play();
      ship.speed = ship.powerUpSpeed;
      this.powerBullets();
      if (this.framesCounter % 600 === 0) {
        ship.isPowerUp = false;
        ship.speed = 5;
      }
    }
  },

  generatePowerUps() {
    if (
      this.framesCounter % this.getRandomInt(1000, 2000) === 0 &&
      this.powerUp.length === 0
    ) {
      this.powerUp.push(new PowerUp(this.ctx, this.canvasSize));
    }
  },

  generateZigZagEnemies() {
    if (this.zigZagEnemies.length === 0) {
      if (this.level === "easy") {
        this.zigZagEnemies.push(
          new ZigZagEnemies(
            this.ctx,
            this.canvasSize,
            this.getRandomInt(0, 400),
            this.getRandomInt(1, 3),
            this.getRandomInt(1, 3),
            this.getRandomInt(10, 100),
            this.getRandomInt(10, 100),
            this.arrColors[this.getRandomInt(0, 5)]
          )
        );
      } else if (this.level === "mid") {
        this.zigZagEnemies.push(
          new ZigZagEnemies(
            this.ctx,
            this.canvasSize,
            this.getRandomInt(0, 400),
            this.getRandomInt(2, 5),
            this.getRandomInt(2, 5),
            this.getRandomInt(10, 100),
            this.getRandomInt(10, 100),
            this.arrColors[this.getRandomInt(0, 5)]
          )
        );
      } else if (this.level === "hard") {
        this.zigZagEnemies.push(
          new ZigZagEnemies(
            this.ctx,
            this.canvasSize,
            this.getRandomInt(0, 400),
            this.getRandomInt(5, 9),
            this.getRandomInt(5, 9),
            this.getRandomInt(10, 100),
            this.getRandomInt(10, 100),
            this.arrColors[this.getRandomInt(0, 5)]
          )
        );
      } else if (this.level === "ironhacker") {
        this.zigZagEnemies.push(
          new ZigZagEnemies(
            this.ctx,
            this.canvasSize,
            this.getRandomInt(0, 400),
            this.getRandomInt(5, 15),
            this.getRandomInt(5, 15),
            this.getRandomInt(10, 100),
            this.getRandomInt(10, 100),
            this.arrColors[this.getRandomInt(0, 5)]
          )
        );
      }
    }
  },

  generateLinearEnemies() {
    if (this.linearEnemies.length === 0) {
      if (this.level === "easy") {
        this.linearEnemies.push(
          new LinearEnemies(
            this.ctx,
            this.canvasSize,
            this.getRandomInt(1, 3),
            this.getRandomInt(20, 100),
            this.arrColors[this.getRandomInt(0, 5)],
            this.getRandomInt(0, 400)
          )
        );
      } else if (this.level === "mid") {
        this.linearEnemies.push(
          new LinearEnemies(
            this.ctx,
            this.canvasSize,
            this.getRandomInt(3, 5),
            this.getRandomInt(20, 100),
            this.arrColors[this.getRandomInt(0, 5)],
            this.getRandomInt(0, 400)
          )
        );
      } else if (this.level === "hard") {
        this.linearEnemies.push(
          new LinearEnemies(
            this.ctx,
            this.canvasSize,
            this.getRandomInt(5, 9),
            this.getRandomInt(20, 100),
            this.arrColors[this.getRandomInt(0, 5)],
            this.getRandomInt(0, 400)
          )
        );
      } else if (this.level === "ironhacker") {
        this.linearEnemies.push(
          new LinearEnemies(
            this.ctx,
            this.canvasSize,
            this.getRandomInt(5, 15),
            this.getRandomInt(20, 100),
            this.arrColors[this.getRandomInt(0, 5)],
            this.getRandomInt(0, 400)
          )
        );
      }
    }
  },

  isCollisionPowerUp() {
    if (this.powerUp.length > 0 && ship.ammunition.length > 0) {
      if (
        ship.ammunition[0].y <= this.powerUp[0].y + this.powerUp[0].width &&
        ship.ammunition[0].x <= this.powerUp[0].x + this.powerUp[0].width &&
        ship.ammunition[0].x + ship.ammunition[0].width >= this.powerUp[0].x
      ) {
        ship.ammunition.pop();
        this.powerUp.pop();
        ship.isPowerUp = true;
        // this.clear()
        // this.ctx.fillStyle =this.arrColors[this.getRandomInt(0,6)]
        // this.ctx.font = '50px space invaders Regular';
        // this.ctx.fillText('POWER-UP', 100, 200)
      }
    }
  },

  isCollision() {
    // colision cartesianos - balas
    if (
      ship.ammunition.length > 0 &&
      this.cartesianArmy.arrCartesianEnemies.length !== 0
    ) {
      this.cartesianArmy.arrCartesianEnemies.some((enemy) => {
        if (
          ship.ammunition[0].y <= enemy.y + enemy.width &&
          ship.ammunition[0].x <= enemy.x + enemy.width &&
          ship.ammunition[0].x + ship.ammunition[0].width >= enemy.x
        ) {
          this.cartesianArmy.arrCartesianEnemies.splice(
            this.cartesianArmy.arrCartesianEnemies.indexOf(enemy),
            1
          );
          ship.ammunition.pop();
          this.counterPoints++;
          return true;
        }
      });
    } else if (ship.ammunition.length > 0) {
      console.log("entro");
      // colision balas - lineares

      //  colisión balas - zig-zag
      if (
        ship.ammunition[0].y <=
          this.zigZagEnemies[0].y + this.zigZagEnemies[0].width &&
        ship.ammunition[0].x <=
          this.zigZagEnemies[0].x + this.zigZagEnemies[0].width &&
        ship.ammunition[0].x + ship.ammunition[0].width >=
          this.zigZagEnemies[0].x
      ) {
        ship.ammunition.pop();
        this.zigZagEnemies.pop();
        this.counterPoints++;
      } else if (
        ship.ammunition[0].y <=
          this.linearEnemies[0].y + this.linearEnemies[0].size &&
        ship.ammunition[0].x <=
          this.linearEnemies[0].x + this.linearEnemies[0].size &&
        ship.ammunition[0].x + ship.ammunition[0].width >=
          this.linearEnemies[0].x
      ) {
        ship.ammunition.pop();
        this.linearEnemies.pop();
        this.counterPoints++;
      }

      // colision balas - finalBoss
      else if (
        this.finalBoss.y + this.finalBoss.height >=
        ship.ammunition[0].y
      ) {
        this.counterPoints++;
        ship.ammunition.pop();

        // ship.width += 5
        // ship.height += 5
        if (this.finalBoss.width > 0) {
          this.finalBoss.color = "#eb2d6d";
          setTimeout(() => {
            this.finalBoss.color = "#71d7f0";
          }, 50);
          this.finalBoss.height -= 5;
          this.finalBoss.width -= 5;
          this.finalBoss.x += 2.5;
        } else if (this.finalBoss.width <= 0) {
          this.win();
        }
      }
    }
  },

  shipCollisionZigZag() {
    if (this.zigZagEnemies.length > 0) {
      if (
        ship.y <= this.zigZagEnemies[0].y + this.zigZagEnemies[0].width &&
        ship.x <= this.zigZagEnemies[0].x + this.zigZagEnemies[0].width &&
        ship.x + ship.width >= this.zigZagEnemies[0].x
      ) {
        ship.isDestroyed = true;
        this.gameOver();
      }
    }
  },

  shipCollisionLinear() {
    if (this.linearEnemies.length > 0) {
      if (
        ship.y <= this.linearEnemies[0].y + this.linearEnemies[0].size &&
        ship.x <= this.linearEnemies[0].x + this.linearEnemies[0].size &&
        ship.x + ship.width >= this.linearEnemies[0].x
      ) {
        ship.isDestroyed = true;
        this.gameOver();
      }
    }

    if (this.cartesianArmy.arrCartesianEnemies.length > 0) {
      this.cartesianArmy.arrCartesianEnemies.some((enemy) => {
        if (
          enemy.y + enemy.height >= ship.y &&
          ship.x <= enemy.x + enemy.width &&
          ship.x + ship.width >= enemy.x
        ) {
          ship.isDestroyed = true;
          this.gameOver();
        }
      });
    }
  },

  win() {
    if (this.framesCounter % 5 === 0) {
      let asdImg = new Image();
      asdImg.src = "../assets/error.jpg";
      asdImg.onload = () => {
        this.ctx.drawImage(asdImg, 0, 0, this.canvasSize.w, this.canvasSize.h);
        // this.ctx.fillStyle = 'white'
      };
    }
    button.removeAttribute("disabled");
    button2.removeAttribute("disabled");
    button3.removeAttribute("disabled");
    button4.removeAttribute("disabled");

    setTimeout(() => {
      clearInterval(interval);
      this.clear();

      let winImg = new Image();
      winImg.src = "../assets/winner.png";
      winImg.onload = () => {
        this.ctx.drawImage(winImg, 0, 0, this.canvasSize.w, this.canvasSize.h);
      };
      setTimeout(() => {
        game.initialBackground();
        game.ctx.fillStyle = "white";
        game.ctx.font = "white space invaders Regular";
        game.ctx.fillText("READY", 200, 200);
      }, 1000);
    }, 1000);
    // },500)
  },

  gameOver() {
    this.gameSound.pause();
    this.gameSound.currentTime = 0;
    this.gameOverMusic.play();
    if (this.framesCounter % 5 === 0) {
      let error = new Image();
      error.src = "../assets/error.jpg";
      error.onload = () => {
        this.ctx.drawImage(error, 0, 0, this.canvasSize.w, this.canvasSize.h);
      };
    }
    // button.classList.remove('hideBtn')
    button.removeAttribute("disabled");
    button2.removeAttribute("disabled");
    button3.removeAttribute("disabled");
    button4.removeAttribute("disabled");

    setTimeout(() => {
      clearInterval(interval);
      this.clear();

      let gameOverImage = new Image();
      gameOverImage.src = "../assets/game_over.jpg";
      gameOverImage.onload = () => {
        this.ctx.drawImage(
          gameOverImage,
          0,
          0,
          this.canvasSize.w,
          this.canvasSize.h
        );
      };

      setTimeout(() => {
        game.initialBackground();
        game.ctx.fillStyle = "white";
        game.ctx.font = "white space invaders Regular";
        game.ctx.fillText("READY", 200, 200);
      }, 1000);
    }, 500);
  },

  showScore() {
    this.score = new Score(this.ctx, this.canvasSize, "white");
  },

  updateScore() {
    this.score.draw();
  },

  controls() {
    if (this.keys[37] || this.keys[65]) {
      ship.moveLeft();
    }
    if (this.keys[39] || this.keys[68]) {
      ship.moveRight();
    }
    if (this.keys[32]) {
      ship.createBullet();
    }
  },

  funInitialMusic() {
    if ((this.isPlaying = true)) {
      this.initialMusic.pause();
      this.initialMusic.currentTime = 0;
      this.initialMusic.loop = false;
    } else {
      this.initialMusic.play();
      this.initialMusic.loop = true;
    }
  },
};

window.addEventListener(
  "keydown",
  function (e) {
    game.keys[e.keyCode || e.which] = true;
  },
  true
);

window.addEventListener(
  "keyup",
  function (e) {
    game.keys[e.keyCode || e.which] = false;
  },
  true
);

const button = document.getElementById("easy");
button.addEventListener("click", () => {
  game.reset();
  game.level = "easy";
  game.start();
  button.setAttribute("disabled", "");
  button2.setAttribute("disabled", "");
  button3.setAttribute("disabled", "");
  button4.setAttribute("disabled", "");

  // button.classList.add('hideBtn')
});
// game.initialBackground()
const button2 = document.getElementById("mid");
button2.addEventListener("click", () => {
  game.reset();
  game.level = "mid";
  game.start();
  button.setAttribute("disabled", "");
  button2.setAttribute("disabled", "");
  button3.setAttribute("disabled", "");
  button4.setAttribute("disabled", "");

  // button.classList.add('hideBtn')
});

const button3 = document.getElementById("hard");
button3.addEventListener("click", () => {
  game.reset();
  game.level = "hard";
  game.start();
  button.setAttribute("disabled", "");
  button2.setAttribute("disabled", "");
  button3.setAttribute("disabled", "");
  button4.setAttribute("disabled", "");

  // button.classList.add('hideBtn')
});

const button4 = document.getElementById("ironhacker");
button4.addEventListener("click", () => {
  game.reset();
  game.level = "ironhacker";
  game.start();
  button.setAttribute("disabled", "");
  button2.setAttribute("disabled", "");
  button3.setAttribute("disabled", "");
  button4.setAttribute("disabled", "");

  // button.classList.add('hideBtn')
});
