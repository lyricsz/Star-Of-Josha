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
    "(Four members of Light sect are appointed by <b>Heavenly King</b> to restore the earth! )",
    "(The earth is in turmoil due to loss of the <b>Star of Peace</b>)",
    "(The four members are to appoint a new star to replace <b>Star of Peace</b>)",
    "......",
    "What should we do now? We can't delay <b>Heavenly King</b> command!",
    "What are you saying? That will only cause delay! This must be done immediately to relieve those mortals suffering!",
    "That's true. Let's get to work! What star should we send to Earth?",
    "<b>Star of Josha</b> seems like a perfect choice! That is the purest and most peaceful star that exist!",
    "Sounds wise and intelligent! Let's get this done!",
    "(They all agreed to send <b>Star of Josha</b> to earth!)",
    "(Meanwhile, in the Heavenly Palace... )",
    "Go now, wind! Fulfill your purpose...",
    "(Also... Meanwhile...)",
    "<b>Star of Josha</b> , are you ready? We'll send you to earth now!",
    "Don't be afraid we'll guide you throughout your entire journey!",
    "Understood! Masters...",
    "(A few minute later! Or was it really a few minute?)"
]

let imagesN = [
    avatar[0],
    avatar[0],
    avatar[0],
    avatar[0],
    avatar[1],
    avatar[3],
    avatar[2],
    avatar[4],
    avatar[1],
    avatar[0],
    avatar[0],
    avatar[5],
    avatar[0],
    avatar[3],
    avatar[2],
    avatar[6],
    avatar[0]
]

let gods = [
    "Narrator",
    "Narrator",
    "Narrator",
    "...",
    "Immortal Blue Light",
    "Immortal Yellow Light",
    "Immortal Red Light",
    "Immortal Green Light",
    "Immortal Blue Light",
    "Narrator",
    "Narrator",
    "...",
    "Narrator",
    "Immortal Yellow Light",
    "Immortal Red Light",
    "Star of Josha",
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
let gameWin;

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