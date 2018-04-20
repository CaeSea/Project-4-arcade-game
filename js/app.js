// Global vars for game over modal.
// Get the modal
const modal = document.getElementById('myModal');
// Get the span that closes the modal
const span = document.getElementsByClassName("close")[0];

// Game object that will hold all the game dependencies.
const Game = {
  allEnemies: [],
  newScore: 0,
  lives: 5,

  makeEnemies: function(howMany) {
    for(i = 0; i <= howMany; i++) {
      this.allEnemies.push(new Enemy());
    }
  },

  addScore: function() {
    const scoreHolder = document.getElementsByClassName('score');
    let score = scoreHolder[0].innerHTML;
    this.newScore = parseInt(score) + 100;
    scoreHolder[0].innerHTML = this.newScore;
  },

  addDifficultyStars: function() {
    const difficultyHolder = document.getElementsByClassName('difficulty');
    let starSpan = document.createElement('span');
    if(this.newScore === 500) {
      difficultyHolder[0].appendChild(starSpan);
      starSpan.innerHTML = '<i class="fas fa-star"></i>';
      this.makeEnemies(1);
    } else if(this.newScore === 800) {
      difficultyHolder[0].appendChild(starSpan);
      starSpan.innerHTML = '<i class="fas fa-star"></i>';
      this.makeEnemies(2);
    }
  },

  minusLife: function() {
    const livesHolder = document.getElementsByClassName('life');
    let life = livesHolder[livesHolder.length-1];
    life.remove();
    this.lives--;
    console.log(this.lives);
  },

  showScore: function() {
    const scoreContainer = document.getElementsByClassName("modal-score")[0];
    const messageContainer = document.getElementsByClassName("modal-content")[0];
    let scoreSpan = document.createElement('span');
    let messageHolder = document.createElement('p');
    let actualScore = document.getElementsByClassName('score')[0].innerHTML;
    let message = "";

    scoreContainer.appendChild(scoreSpan);
    scoreSpan.innerHTML = actualScore;

    if(actualScore <= 500) {
      message = "You need practice...";
    } else if(actualScore <= 1000) {
      message = "Not too bad!";
    } else {
      message = "You're a pro!";
    }
    messageContainer.appendChild(messageHolder);
    messageHolder.innerHTML = message;
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
        yValue = 145;
      break;
    case 3:
        yValue = 230;
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
    this.x = Math.floor(this.x + this.speed*dt);

    if (this.x >= 1010) {
       this.x = -100;
       this.y = this.getY();
       this.speed = this.getSpeed();
   }

   // This checks for player/enemy collision by checking if the co-ords are within range
   if (Math.abs(this.x - player.x) < 75 && Math.abs(this.y - player.y) < 78) {
       player.x = 202;
       player.y = 405;
       if(Game.lives !== 1) {
         Game.minusLife();
       } else {
         // Show game over modal.
         Game.minusLife();
         Game.showScore();
         modal.style.display = "block";
       }
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-princess-girl.png';
    this.x = 202;
    this.y = 405;

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
        if(this.x != 2) { this.x -= 100; }
      break;
    case 'up':
        if(this.y != -20) { this.y -= 85; }
      break;
    case 'right':
        if(this.x != 402) { this.x += 100; }
      break;
    case 'down':
        if(this.y != 405) { this.y += 85; }
      break;
  }
  player.checkWin();
}

Player.prototype.checkWin = function() {
  if(this.y === -20) {
    this.y = 405;
    this.x = 202;
    Game.addScore();
    Game.addDifficultyStars();
  }
};

// Place the player object in a variable called player
const player = new Player();
// Calls the makeEnemies method in the game object to create all enemies.

Game.makeEnemies(3);

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

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
