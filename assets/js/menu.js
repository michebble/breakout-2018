var menuState = {
  create: function() {
    var titleText = game.add.text(80, 100, 'BREAKOUT 2018', { font: '70px Iceland', fill: 'black' });
    titleText.stroke = "#32CD32";
    titleText.strokeThickness = 6;
    var startText = game.add.text(80, 500, 'press button to play', { font: '28px Iceland', fill: 'black' });
    startText.stroke = "#32CD32";
    startText.strokeThickness = 6;


    buttonA = pad1.getButton(Phaser.Gamepad.XBOX360_A);
    buttonB = pad1.getButton(Phaser.Gamepad.XBOX360_B);
    buttonX = pad1.getButton(Phaser.Gamepad.XBOX360_X);
    buttonY = pad1.getButton(Phaser.Gamepad.XBOX360_Y);
    buttonStart = pad1.getButton(Phaser.Gamepad.XBOX360_START);
  
    buttonA.onDown.add(this.start, this);
    buttonB.onDown.add(this.start, this);
    buttonX.onDown.add(this.start, this);
    buttonY.onDown.add(this.start, this);
    buttonStart.onDown.add(this.start, this);
  },
  start: function() {
    game.state.start('play');
  }
}