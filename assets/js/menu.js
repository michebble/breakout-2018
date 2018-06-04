var menuState = {
  create: function() {
    var titleText = game.add.text(80, 100, 'BREAKOUT 2018', { font: '28px Iceland', fill: 'limegreen' });
    var startText = game.add.text(80, 500, 'press B to start', { font: '28px Iceland', fill: 'limegreen' });
    
    
    
  },
  start: function() {
    game.state.start('play');
  }
}