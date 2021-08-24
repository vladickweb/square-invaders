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
	timeInterval: 30,

	init(id) {

		//CONTEXT AND CANVAS
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");
		this.setDimensions();

		//OBJECTS
		this.ship = new Ship(this.ctx, this.canvasSize);
		this.cartesianArmy = new CartesianArmy (this.ctx, this.canvasSize);
		this.cartesianArmy.recruit();
		this.finalBoss = new FinalBoss (this.ctx, this.canvasSize);
		
		//JUEGO
		this.start();
	},

	setDimensions() {
		this.canvas.width = this.canvasSize.w;
		this.canvas.height = this.canvasSize.h;
	},

	start() {
		setInterval(() => {
			this.clear();
			this.controls();
			this.drawAll();
			this.cartesianArmy.movArmy();

		},1000/this.timeInterval); 
	},

	clear() {
		this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h);
	},

	controls() {
		document.onkeydown = (e) => {
			
			switch (e.keyCode) {

			case 37: 
				if (this.ship.isPowerUp){
					this.ship.movLeftPower();
					break;
				}
				else{
					this.ship.movLeft();
					break;
				}
				

			case 39: 
				if (this.ship.isPowerUp){
					this.ship.movRightPower();
					break;
				}else{
					this.ship.movRight();
					break;
				}
				

			case 32: 
				if (this.ship.isPowerUp == true){
					console.log("disparo powerUp");
					this.ship.shootPower();
					break;
				}
				else{
					console.log("disparo normal");
					this.ship.shoot();
					break;
				}
				
				}
				
	  		}
		},
	
	drawAll() {
		this.ship.draw();
		this.ship.drawBullet();
		this.cartesianArmy.draw();
		this.finalBoss.draw();
	},
			
};