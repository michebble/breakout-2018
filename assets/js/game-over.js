var gameOverState = {
  create: function() {
    highScoreText = game.add.text(game.world.width*0.5, game.world.height*0.25, `Congratulations!\nNew High Score: ${score}`, messageFont);
    highScoreText.stroke = "#32CD32";
    highScoreText.strokeThickness = 6;
    highScoreText.anchor.set(0.5);
    
    playAgainText = game.add.text(game.world.width*0.5, game.world.height*0.75, "Press button to play again", guiFont);
    playAgainText.stroke = "#32CD32";
    playAgainText.strokeThickness = 6;
    playAgainText.anchor.set(0.5);

    score = 0;
    lives = 3;

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