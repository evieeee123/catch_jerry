# <a href="https://evieeee123.github.io/catch_jerry/" target="_blank">Catch Jerry</a>

<a href="https://evieeee123.github.io/catch_jerry/" target="_blank">Catch Jerry</a> is a game based on the click event. Jerry will show up on different spots randomly at a random speed. The player will get a point once the player clicks on Jerry and let Tom make collision with Jerry. And it will get 1 more sec for you to play. Each round of the game lasts for 20 seconds, but it will get 1 more sec for you to play for each Jerry you catch. There are two ways to trigger the game over. On the one hand, game over when time's over. On the other hand, game over if the player let Tom make collision with the dog. There is a functionality for you to keep track of your highest score. Try to get more points and have fun!

<img src="https://github.com/evieeee123/catch_jerry/blob/main/img/game-screenshot%20.png" width="700" heigh="300">

<h2>Functionality & MVPs</h2>

<ul>
    <li>Button for the player to start the game</li>
    <li>Pop up window to show the game rules</li>
    <li>Turn on/off the background music</li>
    <li>Timer to control the time of each round of the game</li>
    <li>Record your score and the historical highest score</li>
    <li>Play special sound when the player hits the Jerry/dog</li>
    <li>Tom always faces mouse direction</li>
</ul>


<h2>Technologies, Libraries, APIs</h2>
Created Using JavaScript, Canvas, HTML & CSS

<h2>Technical implementation details</h2>
Use atan2 to calculate the angel between Tom and mouse.

```node
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
```

<h2>Upcoming Features</h2>
    <li>Top 10 high scores list</li>
    <li>Get different points form different Jerry</li>
    <li>Separate into different level</li>
