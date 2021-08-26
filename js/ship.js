class Ship {
    constructor(ctx, canvasSize) {
        this.ctx = ctx;
        this.canvasSize = canvasSize;
        this.height = 50;
        this.width = 50;
        this.marginBottomShip = 20;
        this.yPositionFixed = game.canvasSize.h - (this.height + this.marginBottomShip);
        this.y = this.yPositionFixed;
        this.xPosition = game.canvasSize.w / 2 - (this.width / 2)
        this.x = this.xPosition;
        this.isDestroyed = false;
        this.isPowerUp = false
        this.speed = 8;
        this.powerUpSpeed = 9;
        this.ammunition = []
    };

    draw() {
        if (!this.isDestroyed) {
            this.ctx = game.ctx
            this.ctx.fillStyle = '#eb2d6d '
            this.ctx.fillRect(this.x, this.y, this.width, this.height)
        } else {
            this.ctx = game.ctx
            this.ctx.fillStyle = 'black'
            this.ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }

    isAmmunition() {
        if (this.ammunition[0]) {
            if (!this.ammunition[0].isZoom) {
                this.ammunition[0].draw()
            }
        }
    }

    createPowerBullets() {
        this.ammunition.push(new Bullet(this.ctx, this.canvasSize))
    }

    createBullet() {
        if (this.ammunition.length === 0) {
            this.ammunition.push(new Bullet(this.ctx, this.canvasSize))
            game.laser.load()
            game.laser.play()
            game.laser.volume = 0.3
        }
    }

    moveRight() {
        this.x <= game.canvasSize.w - this.width - 10 ? this.x += this.speed : null
    }

    moveLeft() {
        this.x >= 10 ? this.x -= this.speed : null
    }

    zoomOut() {
        if (this.height > 10) {
            this.height -= .3
            this.width -= .3
        }
    }

    zoomOutBullet() {
        if (this.ammunition.length > 0) {
            this.ammunition[0].height = 3
            this.ammunition[0].width = 3
            this.ammunition[0].drawZoomOut()
        }
    }
}