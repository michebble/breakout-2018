console.log('live')

var game = new Phaser.Game(480, 320, Phaser.CANVAS, null, {
  preload: preload, 
  create: create, 
  update: update
});

var ball;
var paddle;

function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  game.scale.pageAlignHorizontally = true;
  game.scale.pageAlignVertically = true;
  game.stage.backgroundColor = '#eee';

  

  game.load.image('paddle', './assets/img/paddle.png')
  game.load.image('ball', './assets/img/ball.png');
}
function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);
  ball = game.add.sprite(50, 50, 'ball');
  game.physics.enable(ball, Phaser.Physics.ARCADE);
  ball.body.velocity.set(150, 150);
  ball.body.collideWorldBounds = true;
  ball.body.bounce.set(1);
  paddle = game.add.sprite(
    game.world.width * 0.5, 
    game.world.height - 5, 
    'paddle');
  paddle.anchor.set(0.5,1);
}
function update() {
 
}