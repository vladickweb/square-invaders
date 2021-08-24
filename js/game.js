const game = {
	canvas: undefined,
	canvasSize: {
		h: 823,
		w: 411
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

	
	music: new Audio('../assets/bensound-epic.mp3'),
	laser: new Audio('../assets/SpaceLaserShot PE1095407.mp3'),


	keys: {
		RIGHT: "ArrowRight",
		LEFT: "ArrowLeft",
		SPACE: " ",
	},

	init(id) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");
		audio = document.getElementById("audio");
		this.setDimensions();
		ship = new Ship(this.ctx, this.canvasSize);
		this.showScore()
		// this.cartesianArmy = new CartesianArmy (this.ctx, this.canvasSize);//OBJECT ARMY!!!!
		// this.cartesianArmy.recruit();
		this.start();
		this.cartesianArmy = new CartesianArmy(this.ctx, this.canvasSize);
		this.cartesianArmy.recruit();
		this.finalBoss = new FinalBoss(this.ctx, this.canvasSize)
	},

	setDimensions() {
		this.width = this.canvasSize.w;
		this.height = this.canvasSize.h;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	},

	start() {
		interval = setInterval(() => {

		

			this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++
			this.clear();
			this.drawAll();
			this.cleanObjects();
			this.powerUpEffect();
			this.generatePowerUps()
			this.generateZigZagEnemies();
			this.generateLinearEnemies();

			// if (this.cartesianArmy.arrCartesianEnemies.length === 0 && this.counterPoints < 5){
			// }
			
			this.isCollision()
			this.shipCollision()
			this.isCollisionPowerUp()
			ship.isAmmunition();
			this.updateScore()
			this.cartesianArmy.movArmy()
			this.win()
		

			this.aleatoryX =  Math.floor(Math.random() * this.canvasSize.w)
			this.aleatorySpeed = 10 + Math.floor(Math.random() * 20)
			this.aleatorySize = 20 + Math.floor(Math.random() * 45)
			// this.aleatoryDirection = -1 + Math.floor(Math.random() * 2)
			this.randomSign = Math.floor(Math.random()*2) == 1 ? 1 : -1
			this.aleatoryLeftLimit = 50 + Math.floor(Math.random() * this.canvasSize.w/2)
			this.aleatoryRightLimit = this.aleatoryLeftLimit + this.aleatorySize + Math.floor(Math.random() * this.canvasSize.w-this.aleatorySize)
			this.aleatoryGravity = this.aleatorySpeed - 5
			this.randomColor = '#'+Math.floor(Math.random()*16777215).toString()
			



		}, 1000 / this.FPS);

		// this.music.play()

		setInterval(() => {
			this.cartesianArmy.checkMov();
		}, 1000)

		this.controls();

	},

	controls() {
		document.onkeydown = (e) => {
			switch (e.key) {
				case this.keys.RIGHT:
					ship.moveRight();
					break;
				case this.keys.LEFT:
					ship.moveLeft();
					break;
				case this.keys.SPACE:
					ship.createBullet()
					this.laser.play()
					break;
			}
		};


	},

	reset() {},

	drawAll() {

		ship.draw();
		this.powerUp[0] ? this.powerUp[0].draw() : null;
		this.cartesianArmy.draw()
		if (this.cartesianArmy.arrCartesianEnemies.length === 0 && this.counterPoints < 5) {

			this.zigZagEnemies[0] ? this.zigZagEnemies[0].draw() : null;
			this.linearEnemies[0] ? this.linearEnemies[0].draw() : null;

		}
		else if (this.counterPoints >= 5) {
			this.finalBoss.draw()
			this.linearEnemies.length = 0
			this.zigZagEnemies.length = 0
			// ship.zoomOut()
			// .zoomOut()
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
			this.zigZagEnemies = this.zigZagEnemies.filter((elm) => elm.y >= 0 && elm.y < this.canvasSize.h)
		}

		if (this.linearEnemies.length > 0) {
			this.linearEnemies = this.linearEnemies.filter((elm) => elm.y >= 0 && elm.y < this.canvasSize.h)
		}
	},

	getRandomInt(min, max) {
 		return Math.floor(Math.random() * (max - min)) + min;
	},

	powerBullets() {
		if (this.framesCounter % 10 === 0) {
			ship.createPowerBullets()
		}
	},

	powerUpEffect() {
		if (ship.isPowerUp) {
			ship.speed = ship.powerUpSpeed
			this.powerBullets()
			if (this.framesCounter % 1000 === 0) {
				ship.isPowerUp = false
				ship.speed = 5
			}
		}
	},

	generatePowerUps() {
		if (this.framesCounter % 1000 === 0 && this.powerUp.length === 0) {
			this.powerUp.push(new PowerUp(this.ctx, this.canvasSize));
		}
	},

	generateZigZagEnemies() {
		if (this.zigZagEnemies.length === 0) {

			this.zigZagEnemies.push(new ZigZagEnemies(this.ctx, this.canvasSize, this.aleatoryX, this.aleatorySpeed, this.aleatorySpeed - 3, this.aleatorySize, this.aleatorySize, this.aleatoryRightLimit, this.aleatoryLeftLimit, this.randomSign, this.randomColor))
		}
	},

	generateLinearEnemies() {
		// console.log('entro a generar')
		if (this.linearEnemies.length === 0) {
			// console.log('GENERO')
			this.linearEnemies.push(new LinearEnemies(this.ctx, this.canvasSize, this.aleatorySpeed, this.aleatorySize, this.randomColor, this.aleatoryX))
		}
	},


	isCollisionPowerUp() {
			if (this.powerUp.length > 0 && ship.ammunition.length > 0) {
				if (ship.ammunition[0].y <= this.powerUp[0].y + this.powerUp[0].width &&
					ship.ammunition[0].x <= (this.powerUp[0].x + this.powerUp[0].width) &&
					ship.ammunition[0].x + ship.ammunition[0].width >= this.powerUp[0].x) {
					ship.ammunition.pop()
					this.powerUp.pop()
					ship.isPowerUp = true
					this.zigZagEnemies.pop()
					this.linearEnemies.pop()
				}
			} 
	},

	isCollision() {
		

		// colision cartesianos - balas
		if (ship.ammunition.length > 0 && this.cartesianArmy.arrCartesianEnemies.length !== 0) {
			this.cartesianArmy.arrCartesianEnemies.some((enemy) => {
				if (ship.ammunition[0].y <= enemy.y + enemy.width &&
					ship.ammunition[0].x <= (enemy.x + enemy.width) &&
					ship.ammunition[0].x + ship.ammunition[0].width >= enemy.x) {
						this.cartesianArmy.arrCartesianEnemies.splice(this.cartesianArmy.arrCartesianEnemies.indexOf(enemy), 1)
						ship.ammunition.pop()
						return true
				}
			})
		} 

		
		else if (ship.ammunition.length > 0) {
		// colision powerUp - balas
			

			// colision balas - lineares
			if (ship.ammunition[0].y <= this.linearEnemies[0].y + this.linearEnemies[0].size &&
				ship.ammunition[0].x <= (this.linearEnemies[0].x + this.linearEnemies[0].size) &&
				ship.ammunition[0].x + ship.ammunition[0].width >= this.linearEnemies[0].x) {
				ship.ammunition.pop()
				this.linearEnemies.pop()
				this.counterPoints++
			} 
			
				//  colisión balas - zig-zag
			else if (ship.ammunition[0].y <= this.zigZagEnemies[0].y + this.zigZagEnemies[0].width &&
				ship.ammunition[0].x <= (this.zigZagEnemies[0].x + this.zigZagEnemies[0].width) &&
				ship.ammunition[0].x + ship.ammunition[0].width >= this.zigZagEnemies[0].x) {
				ship.ammunition.pop()
				this.zigZagEnemies.pop()
				this.counterPoints++
			} 
			
			// colision balas - finalBoss
			else if (this.finalBoss.y + this.finalBoss.height >= ship.ammunition[0].y) {
				this.counterPoints++
				ship.ammunition.pop()				
				
			}
		}

	},

	shipCollision() {
		if (this.linearEnemies.length > 0) {
			if (ship.y <= this.linearEnemies[0].y + this.linearEnemies[0].size &&
				ship.x <= this.linearEnemies[0].x + this.linearEnemies[0].size &&
				ship.x + ship.width >= this.linearEnemies[0].x) {
				ship.isDestroyed = true;
				this.gameOver()
			}
		}
		if(this.cartesianArmy.arrCartesianEnemies.length > 0) {
			this.cartesianArmy.arrCartesianEnemies.some((enemy) => {
				if(enemy.y + enemy.height >= ship.y && ship.x <= enemy.x + enemy.width && ship.x + ship.width >= enemy.x){
					
					ship.isDestroyed = true;
					this.gameOver()
				}
			})
		}
		// if (this.counterPoints > 5) {
		// 	if (ship.y <= this.finalBoss.y + this.finalBoss.width) {
		// 		ship.isDestroyed = true;
		// 		this.gameOver()
		// 	}
		// }

	},

	win(){
			if(this.finalBoss.y + this.finalBoss.width === ship.y - 10){
				clearInterval(interval)
				setTimeout(()=>{
					this.clear()
					this.ctx.font = '100px space invaders Regular';
					this.ctx.fillText('WINNER!', 150, 300)
				})
			}
		},


	gameOver() {
		clearInterval(interval)
		setTimeout(() => {
			this.clear()
			this.ctx.font = '30px space invaders Regular';
			this.ctx.fillText(`GAME OVER`, 150, 300)
			console.log('done')

		}, 500)

	},

	showScore() {
		this.score = new Score(this.ctx, this.canvasSize, 'red')
	},

	updateScore() {
		this.score.draw()
	}
};