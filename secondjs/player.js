let playerImage1 = new Image();
playerImage1.src = "../assets/images/star1.png";

let playerImage2 = new Image();
playerImage2.src = "../assets/images/star2.png";

let playerImage3 = new Image();
playerImage3.src = "../assets/images/star3.png";

let playerImage = [playerImage1, playerImage2, playerImage3];

class Player{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.vx = 0;
        this.vy = 12;
        this.gravity = 0.1;
        this.going = false;
        this.coming = false;
        this.onGround = false;
        this.index = 0;
        this.timeInterval = 3;
        this.addToIndex = 1;
    }
    update(deltaTime, height){
        this.x += this.vx;
        this.y -= this.vy;
        this.vy -= this.gravity;
        if(this.vy <= 0) {
            this.going = false;
            this.coming = true;
        } else {
            [...background].forEach(a => {
                a.y -= 10;
            })
            this.going = true;
            this.coming = false;
        }

        //Loop and Animate Star Josha
        if(this.timeInterval > 250){
            if(this.index >= 2) this.addToIndex = -1;
            else if(this.index <= 0) this.addToIndex = 1;
            this.index += this.addToIndex
            this.timeInterval = 0;
        }
        else this.timeInterval += deltaTime;

        if(this.y  > height) {
            gameOver = true;
            gameOverFnc()
        }
    }
    draw(){
        ctx.drawImage(playerImage[this.index], this.x, this.y, this.width, this.height)
    }
}

