var game = new Phaser.Game(config.gameWidth, config.gameHeight, Phaser.AUTO, '');
var graphics;

function gameStart() {
    game.state.add('Boot', boot);
    game.state.add('Preload', preload);
    game.state.add('MainMenu', mainMenu);
    game.state.add('Play', play);
    
    game.state.start('Boot');
}