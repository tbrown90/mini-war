var AI = function AI(id) {
	
	function update(playController) {
		switch (playController.gameState) {
			case GameState.playerSetup:
				updatePlaceTrooper(playController);
				break;
			case GameState.playing:
				break;
		}
	}
	
	function updatePlaceTrooper(playController) {
		var self = this;
		setTimeout(function place() {
			var done = false;
			var troops = actor.placeTrooper();
			
			var x = -1;
			var y = -1;
			while (!done) {
				y = utilities.randomRange(0, playController.board.tiles.length);
				x = utilities.randomRange(0, playController.board.tiles[y].length);
				
				var tile = playController.board.tiles[y][x];
				if (tile.ownerId === -1 || tile.ownerId === self.id) {
					done = true;	
				}
			}
			
			playController.board.placeTroops(x, y, self.id, troops);
		}, 500);
	}
	
	var actor = new Actor(id);
	actor.isAi = true;
	
	actor.update = update;
	return actor;
}