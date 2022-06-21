export default class Tom {
    constructor(ctx) {
        this.ctx = ctx;
        this.tomLeft = new Image();
        this.tomLeft.src = './img/tom.gif';
        this.tomRight = new Image();
        this.tomRight.src = './img/tom-right.gif';
        // initial Tom move(start)
        this.x = 0;
        this.y = 500;
        this.radius = 40;
        this.angle = 0;
    }
    // update Tom position to move Tom toward the mouse
    update(mousex, mousey) {
        // compare Tom's crrent position and mouse current position
        const dx = this.x - mousex;
        const dy = this.y - mousey;
        // change angle; make Tom always face mouse direction
        let theta = Math.atan2(dy, dx);
        this.angle = theta;
        if (mousex !== this.x) {
            // dx/20: the number use to control the movement speed
            this.x -= dx / 6;
        }
        if (mousey !== this.y) {
            this.y -= dy / 6;
        }
    }

    draw(mousex) {
        // draw a line to show the path
        // if(mouse.click) {
        //     ctx.lineWidth = 0.2;
        //     ctx.beginPath();
        //     ctx.moveTo(this.x, this.y);
        //     ctx.lineTo(mouse.x, mouse.y);
        //     ctx.stroke();
        // }
        // draw Tom circle
        // this.ctx.fillStyle = 'red';
        // this.ctx.beginPath();
        // this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        // this.ctx.fill();
        // this.ctx.closePath();
        // this.ctx.fillRect(this.x, this.y, this.radius, 10);

        // save current canvas setting
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(this.angle);
        // add Tom img
        if (this.x >= mousex) {
            this.ctx.drawImage(this.tomLeft, -50, -30, 100, 90)
        } else {
            this.ctx.drawImage(this.tomRight, -40, -50, 100, 90)
        }
        // reset all translate and rotate back to how they were when last called ctx.save
        this.ctx.restore();
    }
}