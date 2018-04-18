// Game object that will hold all the game dependencies.
const Game = {
  allEnemies: [],

  makeEnemies: function() {
    for(i = 0; i <=3; i++) {
      this.allEnemies.push(new Enemy());
    }
  }
};

// Enemies our player must avoid
const Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -10;
    this.y = this.getY();
    this.speed = this.getSpeed();
};

// Sets a random Y start point for all enemies.
Enemy.prototype.getY = function() {
  // Generates a random number between 1 & 3.
  let randomNum = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
  let yValue;
  switch (randomNum) {
    case 1:
        yValue = 60;
      break;
    case 2:
        yValue = 140;
      break;
    case 3:
        yValue = 220;
      break;
  }
  return yValue;
}

// Sets a random speed for the enemies.
Enemy.prototype.getSpeed = function() {
  return Math.floor(Math.random()*(600-250+1)+250);
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed*dt;

    if (this.x >= 1010) {
       this.x = -100;
       this.y = this.getY();
       this.speed = this.getSpeed();
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Game.makeEnemies();

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-princess-girl.png';
    this.x = 200;
    this.y = 400;

};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPressed) {
  switch (keyPressed) {
    case 'left':
        this.x = this.x - 100;
      break;
    case 'up':
        this.y = this.y - 90;
      break;
    case 'right':
        this.x = this.x + 100;
      break;
    case 'down':
        this.y = this.y + 90;
      break;
  }
}

// Place the player object in a variable called player
const player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
