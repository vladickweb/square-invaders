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
	//arrCartesianEnemies: [],
	enemies: [],
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
	// aleatoryDirection: undefined,
	

	keys: {
		RIGHT: "ArrowRight",
		LEFT: "ArrowLeft",
		SPACE: " ",
	},

	// aleatorySpeed(){
	// 	aleatorySpeed = 5 + Math.floor(Math.random() * 30)
	// 	console.log(aleatorySpeed)
	// },

	// aleatoryInterval(){

	// },

	// aleatoryX(){
	// 	aleatoryX = Math.floor(Math.random() * this.canvasSize.w)
	// }, 

	aleatoryDirection(){

	},

	init(id) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");
		this.setDimensions();
		ship = new Ship(this.ctx, this.canvasSize);
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
		setInterval(() => {
			this.clear();
			this.drawAll();
			ship.isAmmunition();
			this.cleanObjects();
			ship.powerUpEffect();
			// this.cartesianArmy.checkMov();
			
		}, this.timeInterval);
		
		setInterval(() => {
			this.generatePowerUps();
		}, 3000);

		setInterval(() => {
			this.cartesianArmy.checkMov();
		}, 1000)

		setInterval(() => {
			this.aleatoryX =  Math.floor(Math.random() * this.canvasSize.w)
			this.aleatorySpeed = 10 + Math.floor(Math.random() * 20)
			this.aleatorySize = 20 + Math.floor(Math.random() * 45)
			// this.aleatoryDirection = -1 + Math.floor(Math.random() * 2)
			this.randomSign = Math.floor(Math.random()*2) == 1 ? 1 : -1
			this.aleatoryLeftLimit = 50 + Math.floor(Math.random() * this.canvasSize.w/2)
			this.aleatoryRightLimit = this.aleatoryLeftLimit + this.aleatorySize + Math.floor(Math.random() * this.canvasSize.w-this.aleatorySize)
			this.aleatoryGravity = this.aleatorySpeed - 5
			this.aleatoryColor = '#'+Math.floor(Math.random()*16777215).toString
		

			this.generateEnemies();
			this.generateLinearEnemies();
		}, 1500)

		this.controls();
		this.generateEnemies();

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
					ship.shoot();
					break;
			}
		};
	},

	reset() {},

	drawAll() {
		ship.draw();
		this.powerUp[0] ? this.powerUp[0].draw() : null;
		this.enemies[0] ? this.enemies[0].draw() : null;
		this.linearEnemies[0] ? this.linearEnemies[0].draw() : null;
		this.cartesianArmy.draw();
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

		if (this.enemies.length > 0) {
			this.enemies = this.enemies.filter((elm) => elm.y >= 0 && elm.y < this.canvasSize.h)
		}

		if (this.linearEnemies.length > 0){
			this.linearEnemies = this.linearEnemies.filter((elm) => elm.y >= 0 && elm.y < this.canvasSize.h)
		}
	},
	generatePowerUps() {
		if (this.powerUp.length === 0) {
			this.powerUp.push(new PowerUp(this.ctx, this.canvasSize));
		}
	},

	generateEnemies() {
		if (this.enemies.length === 0) {
			
			this.enemies.push(new Enemies(this.ctx, this.canvasSize, this.aleatoryX, this.aleatorySpeed, this.aleatorySpeed -3, this.aleatorySize, this.aleatorySize, this.aleatoryRightLimit, this.aleatoryLeftLimit, this.randomSign))
		}		
	},

	generateLinearEnemies() {
		console.log('entro a generar')
		if (this.linearEnemies.length === 0) {
			console.log('GENERO')
			this.linearEnemies.push(new LinearEnemies(this.ctx, this.canvasSize, this.aleatorySpeed, this.aleatorySize, this.aleatoryColor, this.aleatoryX))
		}
	},

	isCollision() {},

	gameOver() {},

	showScore() {},
};