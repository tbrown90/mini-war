var AI = function AI(id) {
	
	function update(playController) {
		switch (playController.gameState) {
			case GameState.playerSetup:
				updatePlaceTrooper(playController);
				break;
			case GameState.playing:
				updateMoveTroops(playController);
//                playController.nextTurn();
				break;
		}
	}
	
	function updatePlaceTrooper(playController) {
        var done = false;
        
        var x = -1;
        var y = -1;
        var shouldBeNewTile = Math.random() < actor.newTileChance;
        
        var emptyTiles = playController.board.getTilesForPlayer(-1);
        var ownedTiles = playController.board.getTilesForPlayer(actor.id);
        if (emptyTiles.length === 0 && ownedTiles.length === 0) {
            actor.troopsToPlace--;
            playController.nextTurn();
            console.error('Tried to place tile when no empty tiles or owned tiles.');
        }

        var tile = undefined;

        if (shouldBeNewTile || ownedTiles.length === 0) {
            tile = emptyTiles[utilities.randomRange(0, emptyTiles.length)];
        } else {
            tile = ownedTiles[utilities.randomRange(0, ownedTiles.length)];
        }
        
        playController.board.placeTroops(tile.x, tile.y, actor);
        
        var numTiles = playController.board.numTilesForPlayer(actor.id);
        actor.newTileChance *= 0.95;
        
        playController.nextTurn();
	}
	
	function updateMoveTroops(playController) {
		var myTiles = playController.board.getTilesForPlayer(actor.id);
		var tile = utilities.getTileWithMostTroops(myTiles);
		
		
		playController.nextTurn();
	}
	
	var actor = new Actor(id);
	actor.isAi = true;
	actor.newTileChance = 0.9;
    
	actor.update = update;
	return actor;
}