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
	score: undefined,

	keys: {
		RIGHT: "ArrowRight",
		LEFT: "ArrowLeft",
		SPACE: " ",
	},

	init(id) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");
		this.setDimensions();
		ship = new Ship(this.ctx, this.canvasSize);
		this.showScore()
		this.cartesianArmy = new CartesianArmy (this.ctx, this.canvasSize);//OBJECT ARMY!!!!
		this.cartesianArmy.recruit();
		this.start();
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
			this.isCollision()
			this.shipCollision()
			ship.isAmmunition();
			this.updateScore()
			console.log(ship.ammunition.length)
			

			
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


		setInterval(() => {
				this.cartesianArmy.checkMov();
		}, 1000)

		this.controls();
		// this.generateZigZagEnemies();

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
					break;
			}
		};
	},

	reset() {},

	drawAll() {
		ship.draw();
		this.powerUp[0] ? this.powerUp[0].draw() : null;
		if (this.counterPoints > 5){
			this.cartesianArmy.draw();
		}
		else {
		this.zigZagEnemies[0] ? this.zigZagEnemies[0].draw() : null;
		this.linearEnemies[0] ? this.linearEnemies[0].draw() : null;
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

		if (this.linearEnemies.length > 0){
			this.linearEnemies = this.linearEnemies.filter((elm) => elm.y >= 0 && elm.y < this.canvasSize.h)
		}
	},
	
	powerBullets() {
		if (this.framesCounter % 10 === 0){
			ship.createPowerBullets()
		}
	},

	powerUpEffect(){
		 if (ship.isPowerUp){
			 ship.speed = ship.powerUpSpeed
			 this.powerBullets()
				if (this.framesCounter %1000 === 0){
					ship.isPowerUp = false
					ship.speed = 5
				}
		 }
    },

	generatePowerUps() {
		if (this.framesCounter %1000 === 0 && this.powerUp.length === 0){
			this.powerUp.push(new PowerUp(this.ctx, this.canvasSize));
		}
	},

	generateZigZagEnemies() {
		if (this.zigZagEnemies.length === 0 ) {
			
			this.zigZagEnemies.push(new ZigZagEnemies(this.ctx, this.canvasSize, this.aleatoryX, this.aleatorySpeed, this.aleatorySpeed -3, this.aleatorySize, this.aleatorySize, this.aleatoryRightLimit, this.aleatoryLeftLimit, this.randomSign, this.randomColor))
		}		
	},

	generateLinearEnemies() {
		// console.log('entro a generar')
		if (this.linearEnemies.length === 0) {
			// console.log('GENERO')
			this.linearEnemies.push(new LinearEnemies(this.ctx, this.canvasSize, this.aleatorySpeed, this.aleatorySize, this.randomColor, this.aleatoryX))
		}
	},

	isCollision() {
		if (this.powerUp.length > 0 && ship.ammunition.length > 0){
			if (ship.ammunition[0].y <= this.powerUp[0].y + this.powerUp[0].width && 
			ship.ammunition[0].x <= (this.powerUp[0].x + this.powerUp[0].width) &&
			ship.ammunition[0].x + ship.ammunition[0].width >= this.powerUp[0].x){
				ship.ammunition.pop()
				this.powerUp.pop()
				ship.isPowerUp = true
				this.zigZagEnemies.pop()
				this.linearEnemies.pop()
			}
		}
		else if (ship.ammunition.length > 0){
			if (ship.ammunition[0].y <= this.linearEnemies[0].y + this.linearEnemies[0].size && 
			ship.ammunition[0].x <= (this.linearEnemies[0].x + this.linearEnemies[0].size) &&
			ship.ammunition[0].x + ship.ammunition[0].width >= this.linearEnemies[0].x){
				ship.ammunition.pop()
				this.linearEnemies.pop()
				this.counterPoints++
			}

			else if (ship.ammunition[0].y <= this.zigZagEnemies[0].y + this.zigZagEnemies[0].width && 
			ship.ammunition[0].x <= (this.zigZagEnemies[0].x + this.zigZagEnemies[0].width) &&
			ship.ammunition[0].x + ship.ammunition[0].width >= this.zigZagEnemies[0].x){
				ship.ammunition.pop()
				this.zigZagEnemies.pop()
				this.counterPoints++
			}

					
		} 
			
	},

	shipCollision(){
		if (this.linearEnemies.length > 0){
			if (ship.y <= this.linearEnemies[0].y + this.linearEnemies[0].size &&
			ship.x <= this.linearEnemies[0].x + this.linearEnemies[0].size &&
			ship.x + ship.width >= this.linearEnemies[0].x){
				ship.isDestroyed = true;
				this.gameOver()
				
			}
		}
	},
		

		
	
	gameOver() {
		clearInterval(interval)
		setTimeout(() => {
			this.clear()
			this.ctx.font = '30px space_invaders';
        	this.ctx.fillText(`GAME OVER`, 150, 300)
			console.log('done')

		},500)
		
	},

	showScore() {
		this.score = new Score(this.ctx, this.canvasSize, 'red')
	},

	updateScore() {
		this.score.draw()
	}
};