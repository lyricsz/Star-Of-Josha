let allImgTag = document.querySelectorAll("img");

let bgImg = allImgTag[5];

let images = [
    allImgTag[1],
    allImgTag[2],
    allImgTag[3],
    allImgTag[4]
]


class Platform{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.alpha = 1;
        this.addToAlpha = Math.random() * (0.005 + 0.001) + 0.001;
        this.moveIntervalSpeed = Math.floor(Math.random() * (max - min) + min);
        this.image = images[Math.floor(Math.random() * images.length)];
    }
    update(){
        if(this.alpha < 0.2 || this.alpha > 1){
            this.addToAlpha = -this.addToAlpha;
        }
        this.alpha -= this.addToAlpha;
        this.x-=this.moveIntervalSpeed;
    }
    draw(){
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}