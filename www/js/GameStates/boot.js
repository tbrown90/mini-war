var boot = function boot(game) {
	console.log("Boot State");
};

boot.prototype = {
	preload: function preload() {
		console.log("Boot State: Preload");
	},

	create: function create() {
		console.log("Boot State: Create");
		graphics = game.add.graphics(0, 0);
		
		this.game.state.start("Preload");
	},
	
	shutdown: function shutdown() {
		console.log("Boot State: Shutdown");
		graphics = null;
	}
}