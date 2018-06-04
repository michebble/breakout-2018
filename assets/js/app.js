console.log('live')

var game = new Phaser.Game(960, 640, Phaser.CANVAS, null, {
  preload: preload, 
  create: create, 
  update: update
});

var ball;
var paddle;
var bricks;
var newBrick;
var brickInfo;
var scoreText;
var score = 0;
var lives = 3;
var livesText;
var lifeLostText;
var playing = false;
var startButton;

var textStyle = { font: '24px Iceland', fill: 'limegreen' };

// var bounce;

var pad1;

function preload() {
  // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = '#eee';
  // game.load.spritesheet('ball', './assets/img/wobble.png', 20, 20);
  game.load.image('paddle', './assets/img/paddle.png');
  game.load.image('ball', './assets/img/ball.png');
  game.load.image('brick', './assets/img/brick.png');
  game.load.image('brick-broken', './assets/img/brick-broken.png');
  game.load.spritesheet('button', './assets/img/button.png', 120, 40);
  game.load.image('background', './assets/img/background.jpg');

  game.load.audio('bounce','./assets/audio/hit-paddle.mp3');
  game.load.audio('hit1','./assets/audio/hit-block.mp3');
  game.load.audio('hit2','./assets/audio/hit2.mp3');
  game.load.audio('loss', './assets/audio/loss.mp3');
  game.load.audio('bg-music', './assets/audio/bg-music.ogg');
}
function create() {
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
  scoreText = game.add.text(5, 5, 'Points: 0', textStyle);
  livesText = game.add.text(game.world.width-5, 5, 'Lives: '+lives, textStyle);
  livesText.anchor.set(1,0);
  // lifeLostText = game.add.text(game.world.width*0.5, game.world.height*0.5, 'Life lost, click to continue', textStyle);
  // lifeLostText.anchor.set(0.5);
  // lifeLostText.visible = false;

  startButton = game.add.button(game.world.width*0.5, game.world.height*0.5, 'button', startGame, this, 1, 0, 2);
  startButton.anchor.set(0.5);

  //sounds
  bounce = game.add.audio('bounce');
  hit1 = game.add.audio('hit1');
  hit2 = game.add.audio('hit2');
  loss = game.add.audio('loss');
  music = game.add.audio('bg-music');

  // music.play();

  //control
  game.input.gamepad.start();
  pad1 = game.input.gamepad.pad1;

}
function update() {
  game.physics.arcade.collide(ball, paddle, ballHitPaddle);
  game.physics.arcade.collide(ball, bricks, ballHitBrick);
  if(playing) {
    // paddle.x = game.input.x || game.world.width*0.5;
    paddleMovement()
  } 
  
  if (!playing && pad1.isDown(Phaser.Gamepad.XBOX360_A)) {
     startGame()
  }
}
function paddleMovement() {
  if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
    paddle.x -= 10;
  } else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
    paddle.x += 10;
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

  if (brick.hit) {
    var killTween = game.add.tween(brick.scale);
    killTween.to({x:0 ,y:0}, 200, Phaser.Easing.Linear.None);
    killTween.onComplete.addOnce(function(){
      brick.kill();
    }, this);
    killTween.start();
    hit2.play();
  } else {
    brick.hit = true;
    hit1.play();
    brick.loadTexture('brick-broken', 0);
  }
  
  score += 10;
  scoreText.setText('Points: '+ score);

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
  lives--;
  if(lives) {
      loss.play();
      livesText.setText('Lives: '+lives);
      // lifeLostText.visible = true;
      ball.reset(game.world.width * 0.5, game.world.height -50);
      paddle.reset(game.world.width * 0.5, game.world.height - 5);
      game.input.onDown.addOnce(function(){
          // lifeLostText.visible = false;
          ball.body.velocity.set(200, -200);
      }, this);
  }
  else {
      alert('You lost, game over!');
      location.reload();
  }
}
function ballHitPaddle(ball, paddle) {
  bounce.play();
  // ball.animations.play('wobble');
  ball.body.velocity.x = -1 * 10 * (paddle.x - ball.x);
}
function startGame() {
  startButton.destroy();
  ball.body.velocity.set(200, -200);
  playing = true;
}