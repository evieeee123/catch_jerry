// entry file for js

// import * as export1 from "./scripts/tom.js";
// new export1.Player();

// setup canvas
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.heigth = 500;
ctx.fillStyle = '#fed9b7';
ctx.fillRect(0, 0, 900, 500);
ctx.fillStyle = 'black';
ctx.font = '40px Indie Flower, cursive';
ctx.fillText('RULES', 380, 90);
ctx.font = '30px Indie Flower, cursive';
ctx.fillText('Click Jerry to catch it!', 310, 200);
ctx.fillText('The time of game is 20s', 300, 300);
ctx.fillText('Each Jerry you catch can get 1 point and 1 more second', 120, 400)


let score = 0;
let time = 20;
let gameFrame = 110;
let isGameover = false;
ctx.font = '55px Indie Flower, cursive';

// add background img into canvas
function addImageToCanvas(){
    const background = new Image();
    background.src = './img/game_bg.png';
    //draw background image
    ctx.drawImage(background, 0, 0, 900, 500);
}

function scoreImg(){
    const img = new Image();
    img.src = './img/catch_jerry.gif';
    ctx.drawImage(img, 10, 5, 40, 50)
}

function timerImg(){
    const timer = new Image();
    timer.src = './img/cheese-timer.png';
    ctx.drawImage(timer, 815, 13, 70, 70)
}

const timer = document.querySelector('.start-button');
timer.addEventListener('click', () => {
    let interval = setInterval(() => {
        time--;
        console.log(time)
        if(time <= 0){
            isGameover = true;
            // gameOver();
            console.log(isGameover);
            // console.log("1", gameOver())
            // stop();
            // time = 20;
        }
    }, 1000);
    
    
    function stop(){
        clearInterval(interval);
        // alert('Game Over: your score is ' + score)
    }
    
    // function gameOver() {
    //     // isGameover = true;
    //     stop();
    // }
    
    // console.log("2", gameOver())


// start point tom
// make sure Tom will not run out of the canvas
let canvasPos = canvas.getBoundingClientRect();
const mouse = {
    // initial Tom move(end)
    x: canvas.width/2,
    y: canvas.heigth,
    click: false
}
canvas.addEventListener('mousedown', (e) => {
    mouse.click = true;
    mouse.x = e.x - canvasPos.left;
    mouse.y = e.y - canvasPos.top;
});
canvas.addEventListener('mouseup', () => {
    mouse.click = false;
})


// Tom
const playerLeft = new Image();
playerLeft.src = './img/tom.gif';
const playerRight = new Image();
playerRight.src = './img/tom-right.gif';

class Player {
    constructor(){
        // initial Tom move(start)
        this.x = canvas.width - canvas.width;
        this.y = canvas.heigth;
        this.radius = 40;
        this.angle = 0;
        this.frame = 0;
    }
    // update Tom position to move Tom toward the mouse
    update() {
        // compare Tom's crrent position and mouse current position
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        // change angle; make Tom always face mouse direction
        let theta = Math.atan2(dy, dx);
        this.angle = theta;
        if (mouse.x !== this.x) {
            // dx/20: the number use to control the movement speed
            this.x -= dx/10;
        }
        if (mouse.y !== this.y){
            this.y -= dy/10;
        }
    }

    draw(){
        // draw a line to show the path
        // if(mouse.click) {
        //     ctx.lineWidth = 0.2;
        //     ctx.beginPath();
        //     ctx.moveTo(this.x, this.y);
        //     ctx.lineTo(mouse.x, mouse.y);
        //     ctx.stroke();
        // }
        // draw Tom circle
        // ctx.fillStyle = 'red';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.closePath();
        // ctx.fillRect(this.x, this.y, this.radius, 10);

        // save current canvas setting
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        // add Tom img
        if (this.x >= mouse.x){
            ctx.drawImage(playerLeft, -50, -45, 100, 90)
        } else {
            ctx.drawImage(playerRight, -45, -50, 100, 90)
        }
        // reset all translate and rotate back to how they were when last called ctx.save
        ctx.restore();
    }
}
// create a new Tom
const player = new Player();

// Jerry
const jerry1 = new Image();
jerry1.src = './img/jerry-cheese.png';
const jerry2 = new Image();
jerry2.src = './img/running_jerry.gif';
const jerry0 = new Image();
jerry0.src = './img/catch_jerry.gif';

const jerryArr = [];
class Jerry {
    constructor(){
        // let jerry show up from right
        this.x = canvas.width + Math.random() * canvas.width;
        this.y = Math.random() * canvas.height + 90;
        this.radius = 35;
        this.speed = Math.random() * 8 + 3;
        // keep track of distance between each individual jerry and tom (trigger the score add up when Tom hit Jerry)
        this.distance;
        this.counted = false;
        this.jerry = Math.random();
    }
    update(){
        // move jerry from ringt to left and make jerry show up with different speed
        this.x -= this.speed;
        // calculate distance between Tom and Jerry
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy)
    }
    draw(){
        // ctx.fillStyle = 'blue';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.closePath();
        // ctx.stroke();
        if (this.jerry <= 0.4){
            ctx.drawImage(jerry1, this.x - 30, this.y - 30, 65, 65);
        } else {
            ctx.drawImage(jerry2, this.x - 30, this.y - 30, 58, 58);
        }
    }
}

const catchJerry = document.createElement('audio');
catchJerry.src = './audio/catch-jerry.mp3'


function handleJerry(){
    // run this code every 130 frames
    if (gameFrame % 110 === 0){
        // each 130 frame show up a jerry
        jerryArr.push(new Jerry());
    }
    for(let i = 0; i < jerryArr.length; i++){
        // iterate through the jerry and draw one by one
        jerryArr[i].update();
        jerryArr[i].draw();
        // when jerry run out of the canvas and tom didn't catch it do (also prevent jerry disappear early when hit the boarder):
        if (jerryArr[i].x < 0 - jerryArr[i].radius){
            // remove that jerry from the array
            jerryArr.splice(i, 1);
            i--;
            // check the distance between Tom and jerry
        } else if (jerryArr[i].distance < jerryArr[i].radius + player.radius){
            // make every jerry only count once
                if (!jerryArr[i].counted){
                    // play the sound
                    catchJerry.play();
                    score++;
                    time += 1;
                    ctx.drawImage(jerry0, jerryArr[i].x, jerryArr[i].y, 65, 65)
                    jerryArr[i].counted = true;
                    // remove jerry once be catched
                    jerryArr.splice(i, 1);
                    i--;
                }
            }
    }

}


// dog
const dog = new Image();
dog.src = './img/dog.png';

const dogArr = [];

class Dog {
    constructor() {
        // let dog show up from left
        this.x = 0;
        this.y = Math.random() * canvas.height;
        this.radius = 30;
        this.speed = Math.random() * 3 + 1;
        // keep track of distance between each individual dog and tom (trigger the score add up when Tom hit dog)
        this.distance;
    }
    update() {
        // move jerry from left to right and make dog show up with different speed
        this.x += this.speed;
        // calculate distance between Tom and dog
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy)
    }
    draw() {
        ctx.drawImage(dog, this.x - 28, this.y - 68, 80, 135);
    }
}
const catchDog = document.createElement('audio');
    catchDog.src = './audio/dog-sound.mp3'

function handleDog() {
    // run this code every 130 frames
    if (gameFrame % 200 === 0) {
        // each 130 frame show up a jerry
        dogArr.push(new Dog());
    }
    for (let i = 0; i < dogArr.length; i++) {
        // iterate through the jerry and draw one by one
        dogArr[i].update();
        dogArr[i].draw();
        // when dog run out of the canvas and tom didn't catch it do (also prevent dog disappear early when hit the boarder):
        if (dogArr[i].x < 0 - dogArr[i].radius) {
            // remove that jerry from the array
            dogArr.splice(i, 1);
            i--;
            // check the distance between Tom and jerry
        } else if (dogArr[i].distance < dogArr[i].radius + player.radius) {
            // make every jerry only count once
                // play the sound
                catchDog.play();
                // remove jerry once be catched
                isGameover = true;
        }
    }
}


// for play button to reload the page
timer.addEventListener('click', () => {
        window.location.reload();
    })

// Animation
function animate() {
    // erases the entire canvas from old paint between every animation frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    addImageToCanvas();
    scoreImg();
    timerImg();
    handleJerry();
    handleDog();
    player.update();
    player.draw();
    // score style
    ctx.fillStyle = 'orange'
    ctx.fillText(score, 60, 46);
    ctx.fillStyle = 'black'
    ctx.fillText(time, 825, 60)
    gameFrame++;
    // create a loop; animate another frame at the next repaint
    if(isGameover === false){
        requestAnimationFrame(animate);
        console.log("not over")
    } else{
        cancelAnimationFrame(animate);
        ctx.fillStyle = 'brown';
        ctx.fillText('Game Over', 300, 200);
        ctx.fillText('Your score: ' + score, 300, 260);
        stop();
    }
    
}

animate();
})


// change the mouse cursor
let cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY + 'px'
    cursor.style.left = e.pageX + 'px'
})

window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})

window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
})


let bgMusic = document.getElementById('background_music');
let icon = document.getElementById('icon');

icon.onclick = function (){
    if (bgMusic.paused){
        bgMusic.play();
        icon.src = './img/music_on.png'
    }else {
        bgMusic.pause();
        icon.src = './img/music_off.png'
    }
}


