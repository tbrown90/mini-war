var play = function play(game) {
	console.log("Play State");
};

var board;

play.prototype = {
	create: function create() {
		console.log("Play State: Create");
		graphics = game.add.graphics(0, 0);
		board = new Phaser.Board();
		game.input.onUp.add(board.update, board);
	},

	update: function update() {
		console.log("Play State: Update");

	},

	play: function play() {
		console.log("Play State: Play");
	},

	shutdown: function shutdown() {
		console.log("Play State: Shutdown");
	},

	render: function render() {
		graphics.clear();
		board.render();
	}
}