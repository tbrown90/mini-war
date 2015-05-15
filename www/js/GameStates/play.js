var play = function play(game) {
	console.log("Play State");
};
  
play.prototype = {	
  	create: function create() {
		console.log("Play State: Create");
	},
	
	update: function update() {
		console.log("Play State: Update");	
	},
	
	play: function play() {
		console.log("Play State: Play");
	},
	
	shutdown: function shutdown() {
		console.log("Play State: Shutdown");
	}
}