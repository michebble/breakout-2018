var menuState = {
  create: function() {
    var titleText = game.add.text(80, 150, 'BREAKOUT 2018', { font: '28px Iceland', fill: 'limegreen' });
    var startText = game.add.text(80, 150, 'press B to start', { font: '28px Iceland', fill: 'limegreen' });

    var bKey = pad1.isDown(Phaser.Gamepad.XBOX360_A)
    bKey.onDown.addOnce(this.start, this)
  },
  start: function() {
    game.state.start('play');
  }
}