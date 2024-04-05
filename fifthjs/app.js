const canvas = document.getElementById("myCanvas");
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 600;
window.ctx = canvas.getContext("2d");

let min = 3;
let max  = 5;

let targetScore = 1500;
let score = 0;
let maxWidth = 650;
let timer = 0;
let timeInterval = 1000;
let gameOver = false;

let platforms = [];

let player = new Player(100, 100, 50, 50);
let willStillCheck = true;
let lastTime = 0;

class Background{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = bgImg;
    }
    update(deltaTime){
        this.x -= 10;
        if(this.x + this.width < 0) this.x = canvas.width - 10;
        if(this.y + this.height < 0) this.y = canvas.height - 10;    
    }
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}


const background = [new Background(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT), new Background(CANVAS_WIDTH, 0, CANVAS_WIDTH, CANVAS_HEIGHT), new Background(0, CANVAS_HEIGHT, CANVAS_WIDTH, CANVAS_HEIGHT), new Background(CANVAS_WIDTH,CANVAS_HEIGHT, CANVAS_WIDTH , CANVAS_HEIGHT)];

let replaceDeltaTime = 23;

function allGameLoop(timeStamp){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    let deltaTime = timeStamp - lastTime;
    if(deltaTime > replaceDeltaTime) window.allGameLoop;
    lastTime = timeStamp;
    timer += deltaTime < replaceDeltaTime? deltaTime : replaceDeltaTime;

    background.forEach(a => {
        a.update(deltaTime);
        a.draw(window.ctx)
    })
    player.draw()
    player.update(deltaTime, CANVAS_HEIGHT);

    if(platforms.length !== 0){
        platforms.forEach((platform) => {
            platform.update();
            platform.draw();
            if((player.going || platform.alpha < 0.5) || (platform.x > canvas.width * 0.2) && !willStillCheck) return;
            
            if(collisionDetection(player, platform)){
                player.vx = 0;
                player.vy = 0;
                player.y = platform.y - player.height;
                willStillCheck = false;
                playerImage.src = "../assets/images/star1.png"
                player.onGround = true;
                score++;
                if(score % 50 === 0 && max < 20){
                    max += 0.2;
                    min+=0.1;
                    maxWidth += 0.5;
                }
                if(score >= targetScore ) {
                    gameOver = true;
                    gameWon();
                }
            }
        })

        ctx.fillStyle = "green";
        ctx.textBaseline = "middle";
        ctx.font = "normal bold 30pt monospace"
        ctx.fillText("Target: " + targetScore, 40, 40);
        ctx.fillText("Score: " + score, 40, 70)
        ctx.fillStyle = "white";
        ctx.fillText("Target: " + targetScore, 42, 41);
        ctx.fillText("Score: " + score, 42, 71)
    }

    if(timer > timeInterval){
        createRandomPlatform();
        timer = 0;
        timeInterval = Math.floor(Math.random() * (500 - 350) + 350);
    }

    willStillCheck = true;
    if(!gameOver) requestAnimationFrame(allGameLoop);
}

function collisionDetection(r1, r2)
{
  
  if((r1.x + r1.width > r2.x && r1.x < r2.x + r2.width
    && r1.y + r1.height > r2.y && r1.y < r2.y + r2.height)){
        if(r1.y > r2.y){return false}
        else return true;
    }
}

function createRandomPlatform(){
    platforms = platforms.filter((platform) => {return platform.x + platform.width > 0});
    platforms.push(new Platform(CANVAS_WIDTH, Math.round(Math.random() * CANVAS_HEIGHT), Math.floor(Math.random() * (maxWidth - 350) + 350), 64));
}

function gameStart(){
createRandomPlatform()
window.addEventListener(("keydown"), (e) => {
    const keyPressed = e.key.toUpperCase();
    
    if(keyPressed === "ARROWUP" && player.onGround){
        player.vy = 6;
        playerImage.src = "../assets/star2.png";
        player.onGround = false;
    }
})
}

function gameOverFnc(){
    canvas.style.display = "none";
    boxGameOver.style.display = "block";
}

function gameWon(){
    canvas.style.display = "none";
    boxGameWon.style.display = "block";
}

function replay(){
    
    min = 3;
    max  = 5;

    targetScore = 1500;
    score = 0;
    maxWidth = 650;
    timer = 0;
    timeInterval = 1000;
    gameOver = false;

    platforms = [];

    player.y = 50;
    player.vy = 10;
    willStillCheck = true;
    lastTime = 0;
    boxGameOver.style.display = "none";
    boxGameWon.style.display = "none";
    canvas.style.display = "block"

    gameStart()
    requestAnimationFrame(allGameLoop)
}