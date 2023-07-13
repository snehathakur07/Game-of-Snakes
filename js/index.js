window.onload=()=>{
    var userAgent=navigator.userAgent;
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    if(isMobile){
        document.querySelector("body").innerHTML="Please open on desktop";
    }
}


// game constants 
let inputDir = { x: 0, y: 0 };
let foodSound = new Audio("../asset/music/food.mp3");
let gameOverSound = new Audio("../asset/music/gameover.mp3");
let moveSound = new Audio("../asset/music/move.mp3");
let musicSound = new Audio("../asset/music/music.mp3");

let speed = 3;
let lastPaintTime = 0;
let snakeArr = [
    { x: 5, y: 15 }
]
let food = { x: 8, y: 4 };
let score = 0;



// game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollide(snakeArr) {
    // bumping into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if ((snakeArr[0].x === snakeArr[i].x) && (snakeArr[0].y === snakeArr[i].y)) return true;
    }

    // bumping into the walls
    if ((snakeArr[0].x >= 18 || snakeArr[0].x <= 0) || (snakeArr[0].y >= 18 || snakeArr[0].y <= 0)) return true;
    return false;
}
function gameEngine() {
    setInterval(()=>{
        speed+=0.01;
    },10000);
    //1. Updating the snake variable and food
    console.log(isCollide(snakeArr));
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over! Press Ok to play again");
        musicSound.play();
        snakeArr = [
            { x: 5, y: 15 }
        ];
        score = 0;
    }

    // if eaten the food update the snakeArr
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        score++;
        foodSound.play();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        score_board.innerHTML="Score : "+ score;
        let a = 2, b = 16;
        food.x = Math.round(a + (b - a) * Math.random());
        food.y = Math.round(a + (b - a) * Math.random());
    }



    // moving the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;



    //2. Render the snake and food
    //snake 
    let board=document.querySelector("#board");
    board.innerHTML = "";
    snakeArr.forEach((element, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        if (index == 0) snakeElement.classList.add("head");
        else snakeElement.classList.add("snake-body");
        board.appendChild(snakeElement);
    })
    // food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}


musicSound.play();

// main logic
window.requestAnimationFrame(main);
document.addEventListener("keydown", (e) => {
    // console.log(e);
    inputDir = { x: 0, y: 1 }  // start the game

    switch (e.key) {
        case "ArrowUp":
            moveSound.play();
            inputDir = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            moveSound.play();
            inputDir = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            moveSound.play();
            inputDir = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            moveSound.play();
            inputDir = { x: 1, y: 0 };
            break;
        default:
            break;
    }
})