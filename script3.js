const wordBox = document.getElementById("dialogue");
const outputWord = document.getElementById("that");
const whoIsTalking = document.getElementById("speaker");
const image = document.getElementById("image");



let avatar = [
    "assets/images/narrator.png",
    "assets/images/buttonBlue.png",
    "assets/images/buttonRed.png",
    "assets/images/buttonYellow.png",
    "assets/images/buttonGreen.png",
    "assets/images/nothing.png",
    "assets/images/star1.png"
]

let discussion = [
    "(Star of Josha was on his way to Earth, but was the journey really pleasant?)",
    "<b>Star of Josha</b> Hold on tight! Be careful... ",
    "Be careful of illusions... If I'm being careful... ",
    "This must've been the challenge gaven to us by the <b>Heavenly King</b>...",
    "Hold on tight and prove our worthy of the task, <b>Star of Josha</b>",
    "(Illusions? Is their guiding failing? Who knows? )"
]

let imagesN = [
    avatar[0],
    avatar[1],
    avatar[3],
    avatar[3],
    avatar[1],
    avatar[0],
]

let gods = [
    "Narrator",
    "Immortal Blue Light",
    "Immortal Yellow Light",
    "Immortal Yellow Light",
    "Immortal Blue Light",
    "Narrator"
]

let bgSound = new Audio()
let index = 0;
let gameLoose = new Audio()
let jumpSound = new Audio();

function tellStory(){
    clickSound[Math.floor(Math.random() * clickSound.length) ].play()
    outputWord.innerHTML = discussion[index];
    image.src = imagesN[index];
    whoIsTalking.innerHTML = gods[index];

    if(index === discussion.length - 1){
        index = 0;
        wordBox.style.opacity = 0.5;
        wordBox.removeEventListener("click", tellStory, false)
        setTimeout(function(){
            wordBox.style.display = "none";
            game.style.visibility = "visible"
            bgSound.play()
            gameStart()
            requestAnimationFrame(allGameLoop);
        
        }, 3000);

        return;
    }
    index++;
}

let clickSound;

window.onload = () => {
wordBox.addEventListener("click", tellStory, false);

    const allSound = document.getElementsByTagName("audio");
// console.log(allSound)
    clickSound = [
        allSound[0],
        allSound[1]
    ]
    bgSound = allSound[2];
    jumpSound = allSound[3];
    jumpSound.volume = 0.4;
    gameLoose = allSound[4];
    gameLoose.volume - 0.6;
    bgSound.volume = 0.5;

    gameWin = allSound[5];
    gameWin.volume = 0.7;
    bgSound.loop = true;

    tellStory();
}