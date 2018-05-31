console.log('live')

var game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
  preload: preload, 
  create: create, 
  update: update
});

var ball;
var paddle;
var bricks;
var newBrick;
var brickInfo;

function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = '#eee';

  game.load.image('paddle', './assets/img/paddle.png');
  game.load.image('ball', './assets/img/ball.png');
  game.load.image('brick', './assets/img/brick.png');
}
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //ball
  ball = game.add.sprite(
    game.world.width * 0.5, 
    game.world.height - 25, 
    'ball');
  ball.anchor.set(0.5);
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.velocity.set(150, -150);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);
  ball.checkWorldBounds = true;
  game.physics.arcade.checkCollision.down = false;
  ball.events.onOutOfBounds.add(function(){
    location.reload();
  }, this);

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
}
function update() {
  game.physics.arcade.collide(ball, paddle);
  paddle.x = game.input.x || game.world.width * 0.5;
}

function initBricks() {
  brickInfo = {
    width: 50,
    height: 20,
    count: {
      row: 3,
      col: 7
    },
    offset: {
      top: 50,
      left: 60
    },
    padding: 10
  }
  brick = game.add.group();
  for(c = 0; c < brickInfo.count.col; c++) {
    for(r = 0; r < brickInfo.count.row; r++ ) {
      var brickX = (c * (brickInfo.width + brickInfo.padding)) + brickInfo.offset.left;
      var brickY = (r * (brickInfo.height + brickInfo.padding)) + brickInfo.offset.top;
      
      newBrick = game.add.sprite(brickX, brickY, 'brick');
      game.physics.enable(newBrick, Phaser.Physics.ARCADE);
      newBrick.body.immovable = true;
      newBrick.anchor.set(0.5);
      brick.add(newBrick);
    }
  }
}