const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const grid = 15;

let snake = [{x:150,y:150}];

let dx = grid;
let dy = 0;

let food = randomFood();

let count = 0;

function randomFood(){
    return {
        x: Math.floor(Math.random()*20)*grid,
        y: Math.floor(Math.random()*20)*grid
    };
}

function gameLoop(){

requestAnimationFrame(gameLoop);

if(++count < 6) return;
count = 0;

ctx.clearRect(0,0,canvas.width,canvas.height);

let head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
};

/* tabrak tembok */

if(
head.x < 0 ||
head.x >= canvas.width ||
head.y < 0 ||
head.y >= canvas.height
){
gameOver();
return;
}

snake.unshift(head);

/* makan makanan */

if(head.x === food.x && head.y === food.y){

food = randomFood();

}else{
snake.pop();
}

/* gambar makanan */

ctx.fillStyle="red";
ctx.fillRect(food.x,food.y,grid-1,grid-1);

/* gambar ular */

ctx.fillStyle="lime";

for(let i=0;i<snake.length;i++){

ctx.fillRect(snake[i].x,snake[i].y,grid-1,grid-1);

/* tabrak badan */

for(let j=i+1;j<snake.length;j++){

if(snake[i].x === snake[j].x && snake[i].y === snake[j].y){
gameOver();
}

}

}

}

requestAnimationFrame(gameLoop);

/* kontrol keyboard */

document.addEventListener("keydown",function(e){

if(e.key==="ArrowLeft" && dx===0){
dx=-grid; dy=0;
}

else if(e.key==="ArrowUp" && dy===0){
dx=0; dy=-grid;
}

else if(e.key==="ArrowRight" && dx===0){
dx=grid; dy=0;
}

else if(e.key==="ArrowDown" && dy===0){
dx=0; dy=grid;
}

});

function gameOver(){

document.getElementById("gameOverPopup").style.display="flex";

}

function restartGame(){

snake = [{x:150,y:150}];

dx = grid;
dy = 0;

food = randomFood();

document.getElementById("gameOverPopup").style.display="none";

}

function goMenu(){

window.location.href="menu.html";

}

function moveLeft(){
if(dx===0){
dx=-grid;
dy=0;
}
}

function moveRight(){
if(dx===0){
dx=grid;
dy=0;
}
}

function moveUp(){
if(dy===0){
dx=0;
dy=-grid;
}
}

function moveDown(){
if(dy===0){
dx=0;
dy=grid;
}
}