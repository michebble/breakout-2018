var playState = {
  create: function() {
    clearButtons();

    background = game.add.image(0, 0, 'background');

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;
    //ball
    ball = game.add.sprite(
    game.world.width * 0.5, 
    game.world.height - 50, 
    'ball');
    // ball.animations.add('wobble', [0,1,0,2,0,1,0,2,0], 24);
    ball.anchor.set(0.5);
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    ball.checkWorldBounds = true;
    ball.events.onOutOfBounds.add(ballLeaveScreen, this);

      // paddle
    paddle = game.add.sprite(
      game.world.width * 0.5, 
      game.world.height - 5, 
      'paddle');
    paddle.anchor.set(0.5,1);
    game.physics.enable(paddle, Phaser.Physics.ARCADE);
    paddle.body.immovable = true;
    paddle.body.collideWorldBounds = true;

    // bricks
    initBricks()

    // scoring
    scoreText = game.add.text(5, 5, `SCORE: ${score}`, guiFont);
    scoreText.stroke = "#32CD32";
    scoreText.strokeThickness = 2;
    scoreText.setShadow(2, 2, "#333333", 2, true, false);
    livesText = game.add.text(game.world.width-5, 5, 'LIVES: '+ lives, guiFont);
    livesText.stroke = "#32CD32";
    livesText.strokeThickness = 2;
    livesText.anchor.set(1,0);
    
    //new Game
    newGameText = game.add.text(game.world.width*0.5, game.world.height*0.5, 'press B button to start', messageFont);
    newGameText.stroke = "#32CD32";
    newGameText.strokeThickness = 6;
    newGameText.setShadow(2, 2, "#333333", 2, true, false);
    newGameText.anchor.set(0.5);
    newGameText.visible = true;

    //sounds
    bounce = game.add.audio('bounce');
    hit1 = game.add.audio('hit1');
    hit2 = game.add.audio('hit2');
    loss = game.add.audio('loss');
    music = game.add.audio('bg-music');

    music.play();
  },
  win: function(){
    game.state.start('game-over')
  },
  update: function() {
    game.physics.arcade.collide(ball, paddle, ballHitPaddle);
    game.physics.arcade.collide(ball, bricks, ballHitBrick);
    if(playing) {
      // paddle.x = game.input.x || game.world.width*0.5;
      paddleMovement()
    } 
    if (!playing && pad.isDown(Phaser.Gamepad.XBOX360_A)) {
      startGame()
    }
  }
}

function paddleMovement() {
  if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
    paddle.body.x -= 15;
  } else if (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
    paddle.body.x += 15;
  }
}
function initBricks() {
  brickInfo = {
    width: 50,
    height: 20,
    count: {
      row: 5,
      col: 10
    },
    offset: {
      top: 100,
      left: 120
    },
    padding: 30
  }
  bricks = game.add.group();
  for(c = 0; c < brickInfo.count.col; c++) {
    for(r = 0; r < brickInfo.count.row; r++ ) {
      var brickX = (c * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.left;
      var brickY = (r * (brickInfo.height + brickInfo.padding)) + brickInfo.offset.top;
      newBrick = game.add.sprite(brickX, brickY, 'brick');
      game.physics.enable(newBrick, Phaser.Physics.ARCADE);
      newBrick.body.immovable = true;
      newBrick.hit = false;
      newBrick.anchor.set(0.5);
      bricks.add(newBrick);
    }
  }
}
function ballHitBrick(ball, brick) {
  hit1.play();
  if (brick.hit) {
    var killTween = game.add.tween(brick.scale);
    killTween.to({x:0 ,y:0}, 200, Phaser.Easing.Linear.None);
    killTween.onComplete.addOnce(function(){
      brick.kill();
    }, this);
    killTween.start();
  } else {
    brick.hit = true;
    brick.loadTexture('brick-broken', 0);
  }
  
  score += 10;
  scoreText.setText(`SCORE: ${score}`);

  var count_alive = 0;
  for (i = 0; i < bricks.children.length; i++) {
    if (bricks.children[i].alive == true) {
      count_alive++;
    }
  }
  if (count_alive == 0) {
    location.reload();
  }
}
function ballLeaveScreen() {
  playing = false;
  loss.play();
  lives--;
  if(lives) {
    livesText.setText('LIVES: '+ lives);
    ball.reset(game.world.width * 0.5, game.world.height -50);
    paddle.reset(game.world.width * 0.5, game.world.height - 5);
    game.input.onDown.addOnce(function(){
        ball.body.velocity.set(200, -200);
    }, this);
  } else {
    this.win()
  }
}
function ballHitPaddle(ball, paddle) {
  bounce.play();
  // ball.animations.play('wobble');
  ball.body.velocity.x = -1 * 10 * (paddle.x - ball.x);
}
function randomDirection() {
  var random = Math.floor(Math.random() * 399) - 199;
  return random;
}
function startGame() {
  newGameText.visible = false;
  var randomX = randomDirection();
  ball.body.velocity.set(randomX, -200);
  playing = true;
}
function clearButtons() {
  buttonA.onDown.removeAll();
  buttonB.onDown.removeAll();
  buttonX.onDown.removeAll();
  buttonY.onDown.removeAll();
  buttonStart.onDown.removeAll();
  buttonBack.onDown.removeAll();
  buttonLB.onDown.removeAll();
  buttonLT.onDown.removeAll();
  buttonRB.onDown.removeAll();
  buttonRT.onDown.removeAll();
}