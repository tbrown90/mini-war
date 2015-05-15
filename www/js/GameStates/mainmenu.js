var playButton;

var mainMenu = function mainMenu(game) {
	console.log("MainMenu State");
	
	function playButtonClick(pointer) {
		console.log("MainMenu State: Play");

		var x = pointer.positionDown.x;
		var y = pointer.positionDown.y;
		if (playButton.contains(x, y)) {
			this.game.state.start("Play");	
		}
	}
	
	this.playButtonClick = playButtonClick;
};
  
mainMenu.prototype = {	
  	create: function create() {
		console.log("MainMenu State: Create");
		
		graphics = game.add.graphics(0, 0);
		game.input.onUp.add(this.playButtonClick, this);		
		
		var cX = game.world.centerX;
		var cY = game.world.centerY;
		var w = 400;
		var h = 100;
		playButton = utilities.drawRect(cX - w / 2, cY - h/2, w, h, 0x0000FF, 2, 0xFF0000);
		
		console.log('This: ', this);
	},
	
	shutdown: function shutdown() {
		console.log("MainMenu State: Shutdown");
	}
}

