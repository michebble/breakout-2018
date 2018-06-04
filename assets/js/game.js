var game = new Phaser.Game(960, 640, Phaser.CANVAS, null, {
  preload: preload, 
  create: create, 
  update: update
});


game.state.add('boot');
game.state.add('load');
game.state.add('play');
game.state.add('game-over');

game.state.start('boot');