var width = getWidth();
var height = getHeight();

var game = new Phaser.Game(width, height, Phaser.AUTO, '');
var graphics;

game.state.add('Boot', boot);
game.state.add('Preload', preload);
game.state.add('MainMenu', mainMenu);
game.state.add('Play', play);

game.state.start('Boot');