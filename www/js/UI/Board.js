Phaser.Board = function createBoard() {
	var w = config.boardRect.width
	var h = config.boardRect.height;
	var tileSize = w / config.boardWidth / 2;
	var tileSizeX2 = tileSize * 2;

	var distX = Math.sqrt(3) / 2 * tileSizeX2;
	var halfDistX = distX / 2;
	var distY = tileSizeX2 * (3 / 4);
	var halfDistY = distY / 2;

	this.width = config.boardWidth;
	this.height = config.boardHeight;
	this.tileWidth = distX;
	this.tileHeight = tileSize * 1.5;
	this.tiles = [];
	this.xOffset = (w - (distX * this.width) - halfDistX) / 2 + config.boardRect.x;
	this.yOffset = config.boardRect.y;

	var hexParams = {
		size: tileSize,
		fillColor: config.hexFillColor,
		selectColor: config.hexSelectColor,
		borderColor: config.hexBorderColor,
		borderWidth: config.hexBorderWidth,
		textStyle: { font: "36px Arial", fill: "#222222", align: "center" },
		visible: true
	};

	var xOff = this.xOffset;
	var yOff = this.yOffset;
	for (var y = 0; y < this.height; ++y) {
		if (this.tiles[y] === undefined || this.tiles[y].length > 0) {
			this.tiles.push([]);
		}

		for (var x = 0; x < this.width; ++x) {
			var center = new PIXI.Point((x + 1) * distX + xOff, (y + 1) * distY + yOff);

			hexParams.visible = true;

			hexParams.center = center;

			this.tiles[y].push(Phaser.HexTile(hexParams));
		}

		if (y % 2 == 0) {
			xOff -= halfDistX;
		} else {
			xOff += halfDistX;
		}
	}

	return this;
}

Phaser.Board.prototype.render = function renderBoard() {
	var boardParams = {
		borderColor: config.boardBoarderColor,
		borderWidth: config.boardBorderWidth,
		fillColor: config.boardFillColor,
		x: config.boardRect.x,
		y: config.boardRect.y,
		width: config.boardRect.width,
		height: config.boardRect.height
	};

	Phaser.UIRect(boardParams);

	for (var y = 0; y < this.height; ++y) {
		for (var x = 0; x < this.width; ++x) {
			this.tiles[y][x].render();
		}
	}
}

Phaser.Board.prototype.update = function update() {
	for (var y = 0; y < this.tiles.length; ++y) {
		for (var x = 0; x < this.tiles[y].length; ++x) {
			this.tiles[y][x].update();	
		}
	}
}

Phaser.Board.prototype.clickBoard = function clickBoard(pointer) {
	
	var x = pointer.positionDown.x - this.xOffset;
	var y = pointer.positionDown.y - this.yOffset;

	var pos = utilities.worldPositionToTilePosition(x, y, this.tileWidth, this.tileHeight);
	
	if (pos.row < 0 || pos.row >= this.height ||
		pos.column < 0 || pos.column >= this.width) {
		return;
	}

	var tile = this.tiles[pos.row][pos.column];
	tile.click();
}

Phaser.Board.prototype.placeTroops = function placeTroops(x, y, player) {
	var tile = this.tiles[y][x];
	if (tile.ownerId === -1 || tile.ownerId === player.id) {
        var numTroops = player.placeTrooper();
        
		tile.numTroops += numTroops;
        
        if (numTroops > 0) {            
            tile.ownerId = player.id;
            tile.hex.renderParams.fillColor = config.playerColors[player.id];            
        }
		return true;
	}
	
	return false;
};

Phaser.Board.prototype.placeTrooper = function placeTrooper(pointer, player) {
	var x = pointer.positionDown.x - this.xOffset;
	var y = pointer.positionDown.y - this.yOffset;
    
	var pos = utilities.worldPositionToTilePosition(x, y, this.tileWidth, this.tileHeight);
	
	if (pos.row < 0 || pos.row >= this.height ||
		pos.column < 0 || pos.column >= this.width) {
		return false;
	}
    
	return this.placeTroops(pos.column, pos.row, player);
}

Phaser.Board.prototype.numTilesForPlayer = function getNumTilesForPlayer(id) {
    var count = 0;
    for (var y = 0; y < this.tiles.length; ++y) {
        for (var x = 0; x < this.tiles[y].length; ++x) {
            if (this.tiles[y][x].ownerId === id) {
                count++;   
            }
        }
    }
    
    return count;
}

Phaser.Board.prototype.deselect = function deselect() {
	for (var y = 0; y < this.height; ++y) {
		for (var x = 0; x < this.width; ++x) {
			this.tiles[y][x].hex.selected = false;
		}
	}
}