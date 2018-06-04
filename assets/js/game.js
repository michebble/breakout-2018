var game = new Phaser.Game(960, 640, Phaser.CANVAS, null);

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('game-over', gameOverState);

var ball;
var paddle;
var bricks;
var newBrick;
var brickInfo;
var scoreText;
var score = 0;
var lives = 3;
var livesText;
var playing = false;
var pad1;

const guiFont = { font: '28px Iceland', fill: 'black' };
const messageFont = { font: '70px Iceland', fill: 'black' };
const letters = ['_','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']


game.state.start('boot');