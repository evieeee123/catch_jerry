// entry file for js

import Tom from "./scripts/tom.js"
import Jerry from "./scripts/jerry.js";
import Dog from "./scripts/dog.js";

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
            console.log(isGameover);
        }
    }, 1000);
    
    
    function stop(){
        clearInterval(interval);
        // alert('Game Over: your score is ' + score)
    }
    

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
// create a new Tom
const player = new Tom(ctx);

// Jerry
const jerry0 = new Image();
jerry0.src = './img/catch_jerry.gif';
const jerryArr = [];

const catchJerry = document.createElement('audio');
catchJerry.src = './audio/catch-jerry.mp3'

function handleJerry(){
    // run this code every 130 frames
    if (gameFrame % 110 === 0){
        // each 130 frame show up a jerry
        jerryArr.push(new Jerry(ctx));
    }
    for(let i = 0; i < jerryArr.length; i++){
        // iterate through the jerry and draw one by one
        jerryArr[i].update(player.x, player.y);
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
const dogArr = [];
const catchDog = document.createElement('audio');
catchDog.src = './audio/dog-sound.mp3'
function handleDog() {
    // run this code every 130 frames
    if (gameFrame % 200 === 0) {
        // each 130 frame show up a jerry
        dogArr.push(new Dog(ctx));
    }
    for (let i = 0; i < dogArr.length; i++) {
        // iterate through the jerry and draw one by one
        dogArr[i].update(player.x, player.y);
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
    player.update(mouse.x, mouse.y);
    player.draw(mouse.x);
    // score style
    ctx.fillStyle = 'orange'
    ctx.fillText(score, 60, 46);
    ctx.fillStyle = 'black'
    ctx.fillText(time, 825, 60)
    gameFrame++;
    // create a loop; animate another frame at the next repaint
    if(isGameover === false){
        requestAnimationFrame(animate);
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


// pop out window1
const openWindow1Button = document.querySelectorAll('[data-window1-target]')
const closeWindow1Button = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openWindow1Button.forEach(button => {
    button.addEventListener('click', () => {
        const window1 = document.querySelector(button.dataset.window1Target)
        openWindow1(window1)
    })
})

overlay.addEventListener('click', () => {
    const windows1 = document.querySelectorAll('.window1.active')
    windows1.forEach(window1 => {
        closeWindow1(window1)
    })
})

closeWindow1Button.forEach(button => {
    button.addEventListener('click', () => {
        const window1 = button.closest('.window1')
        closeWindow1(window1)
    })
})

function openWindow1(window1) {
    if (window1 === null) return
    window1.classList.add('active')
    overlay.classList.add('active')
}

function closeWindow1(window1) {
    if (window1 === null) return
    window1.classList.remove('active')
    overlay.classList.remove('active')
}
