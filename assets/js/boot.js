var bootState = {
  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.input.gamepad.start();
    pad1 = game.input.gamepad.pad1;

    game.state.start('load');
  }
}