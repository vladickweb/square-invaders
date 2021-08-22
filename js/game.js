const game = {
  canvas: undefined,
  canvasSize: {h: 823, w: 411},
  ctx: undefined,
  width: undefined,
  height: undefined,
  FPS: 60,
  framesCounter: 0,
  timeInterval: 60,

  background: undefined,
  ship: undefined,
  enemies: [],
  powerUp: [],

  keys: {
	RIGHT: 'ArrowRight',
	LEFT: 'ArrowLeft',
	SPACE: ' '
  },

  init (id){
	this.canvas = document.getElementById(id)
	this.ctx = this.canvas.getContext("2d")
	this.setDimensions()
	ship = new Ship(this.ctx, this.canvasSize)
	this.start()
  },
	

	setDimensions() {
	this.width = this.canvasSize.w
	this.height = this.canvasSize.h
	this.canvas.width = this.width
	this.canvas.height = this.height
  },

	start(){
		setInterval(() => {
			this.clear()
			this.drawAll()
			ship.isAmmunition()
			this.cleanObjects()
			ship.powerUpEffect()
			// console.log(ship.speed)
			console.log('tengo que ir primero')

		},this.timeInterval)

			this.controls()
			this.generatePowerUps()
			console.log('tengo que ir despues')
			this.generateEnemies()
	},

	

	controls(){
		document.onkeydown = e => {
            switch (e.key){
                case this.keys.RIGHT:
					ship.moveRight()
                    break;
                case this.keys.LEFT:
					ship.moveLeft()
                    break;
				case this.keys.SPACE:
					ship.shoot()
					break;
            }
        }
	},

	reset(){

	},

	drawAll(){
		ship.draw()
	},

	clear(){
		this.ctx.clearRect(0,0, this.canvasSize.w, this.canvasSize.h)
		
	},

	cleanObjects(){
		if (ship.ammunition.length > 0){
			if (ship.ammunition[0].y < 0){
				ship.ammunition.pop()
			}
		}

		if (this.powerUp.length > 3){
			this.powerUp.pop()
		}
	},

	generatePowerUps(){
		setInterval(() => {
			this.powerUp.push(new PowerUp(this.ctx, this.canvasSize, 150))
			this.powerUp[0].draw()
		},3000)
	},


	generateEnemies(){
		setInterval(() => {
			this.enemies.push(new Enemies(this.ctx, this.canvasSize, 150, 10))
			this.enemies[0].draw()
		},3000)
	},

	isCollision(){

	},

	gameOver(){

	},

	showScore(){

	}, 

	












}