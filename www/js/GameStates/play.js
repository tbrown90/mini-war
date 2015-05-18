var play = function play(game) {
	console.log("Play State");
};
  
play.prototype = {	
  	create: function create() {
		console.log("Play State: Create");
		graphics = game.add.graphics(0, 0);
		
		var w = game.world.width
		var h = game.world.height;
		var tileSize = config.tileSize;
		var tileSizeX2 = tileSize * 2;
		var tileSizeD2 = tileSize / 2;
		
		var distX = Math.sqrt(3) / 2 * tileSizeX2;
		var halfDistX = distX / 2;
		var distY = tileSizeX2 * (3 / 4);
		var halfDistY = distY / 2;
		
		var numTilesX = w / distX;
		var numTilesY = h / distY;
		
		var xOff = 0;
		var yOff= -halfDistY / 2;
		for (var y = 0; y <= numTilesY; ++y) {
			for (var x = 0; x <= numTilesX; ++x) {
				var center = new PIXI.Point(x * distX + xOff, y * distY + yOff);
				console.log('Y: ', center.y);
				
				if (center.x - halfDistX < 0 || 
					center.x + halfDistX > w ||
					center.y - halfDistY < 0 ||
					center.y + halfDistY > h) {
					continue;	
				}
				
				var hexParams = {
					center: center,
					size: config.tileSize,
					fillColor: 0xff0000,
					borderColor: 0x0000ff,
					borderWidth: 5
				};

				Phaser.UIHex(hexParams);
			}
			
			xOff = 0;
			if (y % 2 == 0) {
				xOff = -halfDistX;
			}
		}
		
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