
export default class Dog {
    constructor(ctx) {
        // let dog show up from left
        this.image = new Image();
        this.image.src = './img/dog.png';
        this.ctx = ctx;
        this.x = 0;
        this.y = Math.random() * 500;
        this.radius = 30;
        this.speed = Math.random() * 3 + 1;
        // keep track of distance between each individual dog and tom (trigger the score add up when Tom hit dog)
        this.distance;
    }
    update(playerx, playery) {
        // move jerry from left to right and make dog show up with different speed
        this.x += this.speed;
        // calculate distance between Tom and dog
        const dx = this.x - playerx;
        const dy = this.y - playery;
        this.distance = Math.sqrt(dx * dx + dy * dy)
    }
    draw() {
        this.ctx.drawImage(this.image, this.x - 28, this.y - 68, 80, 135);
    }
}
