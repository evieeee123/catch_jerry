# catch-jerry

Catch Jerry is a game based on the click event. Jerry will show up on different spots randomly with random speed. The player will get point once the player clicks on the Jerry and let Tom make collision with Jerry. And it will get 1 more sec for you to play. Each round of the game lasts for 20 seconds, but it will get 1 more sec for you to play for each Jerry you catch. There are two ways to trigger the game over. On the one hand, game over when time's over. On the other hand, game over if the player let Tom make collision with dog. There is a funtionality for you to keep track of your highest score. Try to get more points and have fun!

<img src="https://github.com/evieeee123/whack_mole/blob/main/img/wireframe.png">

<h1>Functionality & MVPs</h1>

<ul>
    <li>Button for the player to start the game</li>
    <li>Pop up window to show the game rules</li>
    <li>Turn on/off the background music</li>
    <li>Timer to control the time of each round of the game</li>
    <li>Record your score and the historical highest score</li>
    <li>Play special sound when the player hits the Jerry/dog</li>
    <li>Tom always faces mouse direction</li>
</ul>


<h1>Technologies, Libraries, APIs</h1>
Created Using JavaScript, Canvas, HTML & CSS

<h1>Technical implementation details</h1>
Use atan2 to calculate the angel between Tom and mouse.
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

<h1>Upcoming Features</h1>
    <li>Top 10 high scores list</li>
    <li>Get different points form different Jerry</li>
    <li>Separate into different level</li>
