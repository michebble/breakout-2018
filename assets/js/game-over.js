var gameOverState = {
  create: function() {
    highScoreText = game.add.text(game.world.width*0.5, game.world.height*0.25, `Well Done!\nYour Score is: ${score}`, messageFont);
    highScoreText.stroke = "#32CD32";
    highScoreText.strokeThickness = 6;
    highScoreText.anchor.set(0.5);
    
    playAgainText = game.add.text(game.world.width*0.5, game.world.height*0.75, playMessage + ' again', guiFont);
    playAgainText.stroke = "#32CD32";
    playAgainText.strokeThickness = 6;
    playAgainText.anchor.set(0.5);

    score = 0;
    lives = 3;

    if (game.input.gamepad.supported && game.input.gamepad.active && pad.connected) {
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
      game.input.onDown.add(this.start, this);
    }

  },
  start: function() {
    game.state.start('play');
  }
}