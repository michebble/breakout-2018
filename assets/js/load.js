var loadState = {
  preload: function() {
    var loadingText = game.add.text(80, 150, 'LOADING...', { font: '28px Iceland', fill: 'limegreen' });

    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#eee';
  
    game.load.image('paddle', './assets/img/paddle.png');
    game.load.image('ball', './assets/img/ball.png');
    game.load.image('brick', './assets/img/brick.png');
    game.load.image('brick-broken', './assets/img/brick-broken.png');
    game.load.image('background', './assets/img/background.jpg');

    game.load.audio('bounce','./assets/audio/hit-paddle.mp3');
    game.load.audio('hit1','./assets/audio/hit-block.mp3');
    game.load.audio('hit2','./assets/audio/hit2.mp3');
    game.load.audio('loss', './assets/audio/loss.mp3');
    game.load.audio('bg-music', './assets/audio/bg-music.ogg');
  
  },
  create: function() {
    game.state.start('menu');
  }
}