export default class Jerry {
    constructor(ctx) {
        // let jerry show up from right
        this.ctx = ctx;
        this.jerry1 = new Image();
        this.jerry1.src = './img/jerry-cheese.png';
        this.jerry2 = new Image();
        this.jerry2.src = './img/running_jerry.gif';
        this.x = 900 + Math.random() * 900;
        this.y = getRandomNum(90, 500)
        this.radius = 35;
        this.speed = Math.random() * 8 + 3;
        // keep track of distance between each individual jerry and tom (trigger the score add up when Tom hit Jerry)
        this.distance;
        this.counted = false;
        this.jerry = Math.random();
    }
    update(playerx, playery) {
        // move jerry from ringt to left and make jerry show up with different speed
        this.x -= this.speed;
        // calculate distance between Tom and Jerry
        const dx = this.x - playerx;
        const dy = this.y - playery;
        this.distance = Math.sqrt(dx * dx + dy * dy)
    }
    draw() {
        // ctx.fillStyle = 'blue';
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // ctx.fill();
        // ctx.closePath();
        // ctx.stroke();
        if (this.jerry <= 0.4) {
            this.ctx.drawImage(this.jerry1, this.x - 30, this.y - 30, 65, 65);
            console.log("jerry1")
        } else {
            this.ctx.drawImage(this.jerry2, this.x - 30, this.y - 30, 58, 58);
            console.log("jerry2")

        }
    }
}
function getRandomNum(min, max){
    return Math.random() * (max - min) + min;
}