var menuState = {
  create: function() {
    var titleText = game.add.text(80, 100, 'BREAKOUT 2018', { font: '70px Iceland', fill: 'black' });
    titleText.stroke = "#32CD32";
    titleText.strokeThickness = 6;
    var startText = game.add.text(80, 500, 'press W to start', { font: '28px Iceland', fill: 'black' });
    startText.stroke = "#32CD32";
    startText.strokeThickness = 6;
    wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

    wKey.onDown.addOnce(this.start, this)
    
  },
  start: function() {
    game.state.start('play');
  }
}