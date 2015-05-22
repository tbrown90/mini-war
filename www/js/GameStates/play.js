var play = function play(game) {
	console.log("Play State");
};

play.prototype = {
	create: function create() {
		console.log("Play State: Create");
		graphics = game.add.graphics(0, 0);
		
		this.initializeBoard();
	},

	update: function update() {
		console.log("Play State: Update");
		app.board.update();
	},

	play: function play() {
		console.log("Play State: Play");
	},

	shutdown: function shutdown() {
		console.log("Play State: Shutdown");
	},

	render: function render() {
		graphics.clear();
		app.board.render();
	},
	
	initializeBoard: function initializeBoard() {
		app.board = new Phaser.Board();
		game.input.onUp.add(app.board.clickBoard, app.board);
	},
	
	initializePlayers: function initializePlayer() {
		
	}
}