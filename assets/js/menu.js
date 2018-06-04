var menuState = {
  create: function() {
    var titleText = game.add.text(game.world.width*0.5, game.world.height*0.25, 'BREAKOUT 2018', messageFont);
    titleText.stroke = "#32CD32";
    titleText.strokeThickness = 6;
    titleText.anchor.set(0.5);
    var startText = game.add.text(game.world.width*0.5, game.world.height*0.75, 'press START button to play', guiFont);
    startText.stroke = "#32CD32";
    startText.strokeThickness = 6;
    startText.anchor.set(0.5);


    
    buttonStart = pad1.getButton(Phaser.Gamepad.XBOX360_START);
    buttonStart.onDown.add(this.start, this);
  },
  start: function() {
    game.state.start('play');
  }
}