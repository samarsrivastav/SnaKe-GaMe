let inputdir = { x: 0, y: 0 };
const FoodSound = new Audio("music/food.mp3");
const GameOverSound = new Audio("music/gameover.mp3");
const MoveSound = new Audio("music/move.mp3");
const MusicSound = new Audio("music/music.mp3");
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let score=0;
food = { x: 5, y: 10 };
//game functions
function main(ctime) {
  window.requestAnimationFrame(main);
//   console.log(ctime);
  if ((ctime - lastPaintTime) / 1000 < 0.09) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}
function gameEngine() {
//part-1
function isCollide(snake){
    for(let i=1;i<snake.length;i++){
        if(snake[0].x===snake[i].x && snake[0].y===snake[i].y){
            return true;
        }
    } 
    if(snake[0].x<=0 ||snake[0].x>=18 || snake[0].y<=0||snake[0].y>=18){
            return true;
        }
}
if (isCollide(snakeArr)) {
    GameOverSound.play();
    MusicSound.pause();
    inputdir =  {x: 0, y: 0}; 
    alert("Game Over. Press any key to play again!");
    snakeArr = [{x: 13, y: 15}];
    MusicSound.play();
    score = 0; 
}
if(snakeArr[0].x===food.x && snakeArr[0].y===food.y){
    score += 1;
    FoodSound.play();
    scorebox.innerHTML= "Score: " + score;
    snakeArr.unshift({x: snakeArr[0].x + inputdir.x, y: snakeArr[0].y + inputdir.y});
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
}
//moving the snake
for (let i = snakeArr.length - 2; i>=0; i--) { 
    snakeArr[i+1] = {...snakeArr[i]};
}

snakeArr[0].y += inputdir.y;
snakeArr[0].x += inputdir.x;
    //part-2

board.innerHTML = "";
snakeArr.forEach((e, index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if(index === 0){
        snakeElement.classList.add('head');
    }
    else{
        snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
});
// Display the food
foodElement = document.createElement('div');
foodElement.style.gridRowStart = food.y;
foodElement.style.gridColumnStart = food.x;
foodElement.classList.add('food')
board.appendChild(foodElement);
}

//game logics
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputdir={x:0 ,y:1};
    MoveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputdir.x= 0;
            inputdir.y= -1;
            break;
    
        case "ArrowDown":
                console.log("ArrowDown");
                inputdir.x= 0;
                inputdir.y= 1;
                break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputdir.x= 1;
            inputdir.y= 0;              
           break;

         case "ArrowLeft":
            console.log("ArrowLeft");
            inputdir.x= -1;
            inputdir.y=0 ;
            break;
       
        default:
            break;
    }
})
