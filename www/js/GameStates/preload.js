var preload = function preload(game) {
	console.log("Preload State");
};

preload.prototype = {
	preload: function preload() {
		console.log("Preload State: Preload");
	},

	create: function create() {
		console.log("Preload State: Create");
		this.game.state.start("MainMenu");
	},
	
	shutdown: function shutdown() {
		console.log("Preload State: Shutdown");
	}
}