var gameOverState = {
  create: function() {
    addHighScore = game.add.text(game.world.width*0.5, game.world.height*0.25, `Congratulations!\nNew High Score: ${score}`, messageFont);
    addHighScore.anchor.set(0.5);
    addHighScore.visible = true;
  }
}