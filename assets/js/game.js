var game = new Phaser.Game(960, 640, Phaser.CANVAS, null);

game.state.add('boot');
game.state.add('load');
game.state.add('menu');
game.state.add('play');
game.state.add('game-over');

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
game.input.gamepad.start();
var pad1 = game.input.gamepad.pad1;

const guiFont = { font: '28px Iceland', fill: 'limegreen' };
const messageFont = { font: '70px Iceland', fill: 'limegreen' };
const letters = ['_','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']


game.state.start('boot');