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

  // Loops through a given number and instatiates that amount of enemeies
  makeEnemies: function(howMany) {
    for(i = 0; i <= howMany; i++) {
      this.allEnemies.push(new Enemy());
    }
  },

  // Adds 100 points to score for each successful crossing
  addScore: function() {
    const scoreHolder = document.getElementsByClassName('score');
    let score = scoreHolder[0].innerHTML;
    this.newScore = parseInt(score) + 100;
    scoreHolder[0].innerHTML = this.newScore;
  },

  // Adds a visual indicator of stars to the difficulty level so the player can see the difficulty
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

  // Manipulates the DOM to take away a life heart when a collision is made
  minusLife: function() {
    const livesHolder = document.getElementsByClassName('life');
    let life = livesHolder[livesHolder.length-1];
    if(livesHolder.length != 0) {
      life.remove();
      this.lives--;
    }
  },

  // Adds the player score to the game over modal and adds a message based on the players score
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
    messageHolder.classList.add('your-score');
    messageHolder.innerHTML = message;
  },

  // Resets all game dependencies after game over and restart button is clicked
  restart: function() {
    // Closes modal
    modal.style.display = "";
    // Resets player position
    player.x = 202;
    player.y = 405;
    // Adds lives back
    const livesHolder = document.getElementsByClassName('lives')[0];
    let newLife = document.createElement('li');
    newLife.classList.add('life');
    newLife.innerHTML = '<i class="fas fa-heart"></i>';
    for(i=0; i<5; i++) {
      livesHolder.appendChild(newLife.cloneNode(true));
    }
    this.lives = 5;
    // Reset score to 0
    const scoreHolder = document.getElementsByClassName('score')[0];
    this.newScore = 0;
    scoreHolder.innerHTML = this.newScore;
    // Reset Difficulty level
    const difficultyHolder = document.getElementsByClassName('difficulty')[0];
    difficultyHolder.innerHTML = 'Difficulty: <span><i class="fas fa-star"></i></span>';
    this.allEnemies.length = 0;
    this.makeEnemies(3);
    // Reset modal
    const scoreContainer = document.getElementsByClassName("modal-score")[0];
    const messageContainer = document.getElementsByClassName("your-score")[0];
    scoreContainer.innerHTML = "Your Score: ";
    messageContainer.remove(messageContainer[0]);
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

// This is our player class, with all player dependencies
const Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-princess-girl.png';
    this.x = 202;
    this.y = 405;

};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handles player keyboard input and moves character accordingly
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

// Checks if the player has reached the water after every move
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

// Calls the makeEnemies method in the game object to create all starting enemies.
Game.makeEnemies(3);

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
