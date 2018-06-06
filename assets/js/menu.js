var menuState = {
  create: function() {
    if (game.input.gamepad.supported && game.input.gamepad.active && pad.connected) {
      playMessage = 'press any button to play';
      buttonA = pad.getButton(Phaser.Gamepad.XBOX360_A);
      buttonB = pad.getButton(Phaser.Gamepad.XBOX360_B);
      buttonX = pad.getButton(Phaser.Gamepad.XBOX360_X);
      buttonY = pad.getButton(Phaser.Gamepad.XBOX360_Y);
      buttonStart = pad.getButton(Phaser.Gamepad.XBOX360_START);
      buttonBack = pad.getButton(Phaser.Gamepad.XBOX360_BACK);
      buttonLB = pad.getButton(Phaser.Gamepad.XBOX360_LEFT_BUMPER);
      buttonLT = pad.getButton(Phaser.Gamepad.XBOX360_LEFT_TRIGGER);
      buttonRB = pad.getButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);
      buttonRT = pad.getButton(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);
      buttonA.onDown.add(this.start, this);
      buttonB.onDown.add(this.start, this);
      buttonX.onDown.add(this.start, this);
      buttonY.onDown.add(this.start, this);
      buttonStart.onDown.add(this.start, this);
      buttonBack.onDown.add(this.start, this);
      buttonLB.onDown.add(this.start, this);
      buttonLT.onDown.add(this.start, this);
      buttonRB.onDown.add(this.start, this);
      buttonRT.onDown.add(this.start, this);
    } else {
      playMessage = 'click to play';
      game.input.onDown.add(this.start, this);
    }

    var titleText = game.add.text(game.world.width*0.5, game.world.height*0.25, 'BREAKOUT 2018', messageFont);
    titleText.stroke = "#32CD32";
    titleText.strokeThickness = 6;
    titleText.anchor.set(0.5);
    var startText = game.add.text(game.world.width*0.5, game.world.height*0.75, playMessage, guiFont);
    startText.stroke = "#32CD32";
    startText.strokeThickness = 6;
    startText.anchor.set(0.5);
  },
  start: function() {
    game.state.start('play');
  }
}