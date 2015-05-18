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
		var rectParams = {
			x: cX - w / 2,
			y: cY - h / 2,
			width: w,
			height: h,
			borderColor: 0x0000ff,
			borderWidth: 2,
			fillColor: 0xff0000,
			style: { font: "65px Arial", fill: "#ffffff", align: "center" },
			text: "Hello World",
			anchor: 0.5
		};
		
		playButton = new Phaser.TextButton(rectParams);
	},
	
	shutdown: function shutdown() {
		console.log("MainMenu State: Shutdown");
	}
}

