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
	restrictAddEventListener: false,

	
	music: new Audio('../assets/bensound-epic.mp3'),
	laser: new Audio('../assets/SpaceLaserShot PE1095407.mp3'),



	keys: {},


	init(id) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");
		audio = document.getElementById("audio");
		this.setDimensions();
		ship = new Ship(this.ctx, this.canvasSize);
		this.showScore()
		// this.cartesianArmy = new CartesianArmy (this.ctx, this.canvasSize);//OBJECT ARMY!!!!
		// this.cartesianArmy.recruit();
		// this.start();
		this.cartesianArmy = new CartesianArmy(this.ctx, this.canvasSize);
		this.cartesianArmy.recruit();
		this.finalBoss = new FinalBoss(this.ctx, this.canvasSize)
		this.initialBackground()


		// this.initialBackground = new BgStart(this.ctx, this.canvasSize)
		
		// this.initialBackground.draw()
	},

	setDimensions() {
		this.width = this.canvasSize.w;
		this.height = this.canvasSize.h;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
	},

	initialBackground(){
    	let bgImg = new Image();
    	bgImg.src = '../assets/startBackground2.jpg';
    	bgImg.onload = () => {
        this.ctx.drawImage(bgImg, 0, 0, this.canvasSize.w, this.canvasSize.h);
}
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
			this.shipCollisionLinear()
			this.shipCollisionZigZag()
			this.isCollisionPowerUp()
			ship.isAmmunition();
			this.updateScore()
			this.cartesianArmy.movArmy()
			this.win()
			this.controls();
			



		}, 1000 / this.FPS);


		setInterval(() => {
			this.cartesianArmy.checkMov();
		}, 1000)


	},

	reset() {},

	drawAll() {

		ship.draw();
		this.powerUp[0] ? this.powerUp[0].draw() : null;
		this.cartesianArmy.draw()
		if (this.cartesianArmy.arrCartesianEnemies.length === 0 && this.counterPoints < 100) {

			this.zigZagEnemies[0] ? this.zigZagEnemies[0].draw() : null;
			this.linearEnemies[0] ? this.linearEnemies[0].draw() : null;

		}
		else if (this.counterPoints >= 100) {
			this.finalBoss.draw()
			this.linearEnemies.length = 0
			this.zigZagEnemies.length = 0
			ship.zoomOut()
			ship.zoomOutBullet()
			
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
		if (this.framesCounter % 10 === 0 && this.counterPoints < 100) {
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

			this.zigZagEnemies.push(new ZigZagEnemies(this.ctx, this.canvasSize, this.getRandomInt(0,400), this.getRandomInt(2, 7), this.getRandomInt(5, 15), this.getRandomInt(10, 100), this.getRandomInt(10,100), 'yellow'))
		}
	},

	generateLinearEnemies() {
		// console.log('entro a generar')
		if (this.linearEnemies.length === 0) {
			// console.log('GENERO')
			this.linearEnemies.push(new LinearEnemies(this.ctx, this.canvasSize, this.getRandomInt(5, 15), this.getRandomInt(20, 100), 'blue', this.getRandomInt(0, 400)))
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

	shipCollisionZigZag(){
		if (this.zigZagEnemies.length > 0) {
			if (ship.y <= this.zigZagEnemies[0].y + this.zigZagEnemies[0].width &&
				ship.x <= this.zigZagEnemies[0].x + this.zigZagEnemies[0].width &&
				ship.x + ship.width >= this.zigZagEnemies[0].x) {
				ship.isDestroyed = true;
				this.gameOver()
			}
		}
	},


	shipCollisionLinear() {
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
		// button.classList.remove('hideBtn')
		button.removeAttribute('disabled')
		setTimeout(() => {
			this.clear()
			this.ctx.font = '30px space invaders Regular';
			this.ctx.fillText(`GAME OVER`, 150, 300)
			console.log('done')

		}, 500)

	},

	showScore() {
		this.score = new Score(this.ctx, this.canvasSize, 'white')
	},

	updateScore() {
		this.score.draw()
	},

	controls(){
		if(this.keys[37] || this.keys[65]){
			console.log('izquierda')
			ship.moveLeft()
		}
		if (this.keys[39] || this.keys[68]){
			console.log('izquierda')
			ship.moveRight()
		}
		if(this.keys[32]){
			ship.createBullet()
			this.laser.play()
		}
	}
};

window.addEventListener('keydown', function(e) {
	game.keys[e.keyCode || e.which] = true;
}, true)

window.addEventListener('keyup', function(e){
	game.keys[e.keyCode || e.which] = false;
}, true)


const button = document.getElementById('start')
button.addEventListener('click', () => {
	game.start()
	button.setAttribute('disabled', '')
	// button.classList.add('hideBtn')
})
// game.initialBackground()