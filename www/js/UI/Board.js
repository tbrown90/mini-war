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
    this.tileSelected = false;

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
            
            hexParams.x = x;
            hexParams.y = y;

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

// Core Board Functions
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

Phaser.Board.prototype.deselect = function deselect() {
	for (var y = 0; y < this.height; ++y) {
		for (var x = 0; x < this.width; ++x) {
			this.tiles[y][x].hex.selected = false;
		}
	}
    
    this.tileSelected = false;
}

//Interaction
Phaser.Board.prototype.attackTile = function attackTile(from, destination, playerId) {
	if (this.canMoveToTile(destination, from)) { 
		//ATTACK
		if (destination.ownerId === playerId || destination.ownerId === -1) {
			destination.numTroops += from.numTroops;
			destination.hex.renderParams.fillColor = from.hex.renderParams.fillColor;
			destination.ownerId = playerId;
		} else {
			var troops = destination.numTroops;
			destination.numTroops -= from.numTroops;

			if (destination.numTroops < 0) {
				destination.ownerId = from.ownerId;
				destination.hex.renderParams.fillColor = from.hex.renderParams.fillColor;
				destination.numTroops = Math.abs(destination.numTroops);
			}
		}

		from.numTroops = 0;
		return true;
	}
	
	return false;
}

Phaser.Board.prototype.clickBoard = function clickBoard(pointer, playerId) {
	
	var x = pointer.positionDown.x - this.xOffset;
	var y = pointer.positionDown.y - this.yOffset;

	var pos = utilities.worldPositionToTilePosition(x, y, this.tileWidth, this.tileHeight);
	
	if (pos.row < 0 || pos.row >= this.height ||
		pos.column < 0 || pos.column >= this.width) {
		return;
	}

    var tile = this.tiles[pos.row][pos.column];
    if (this.tileSelected === false) {
        if (tile.ownerId === playerId && tile.numTroops > 0) {
            tile.click();
            this.tileSelected = true;
        }
    } else {
        var fromTile = this.getSelectedTile();
        
		var attack = this.attackTile(fromTile, tile, playerId);
		console.log(attack);
        return attack;
    }
    
    return false;
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

Phaser.Board.prototype.clickPlaceTrooper = function clickPlaceTrooper(pointer, player) {
	var x = pointer.positionDown.x - this.xOffset;
	var y = pointer.positionDown.y - this.yOffset;
    
	var pos = utilities.worldPositionToTilePosition(x, y, this.tileWidth, this.tileHeight);
	
	if (pos.row < 0 || pos.row >= this.height ||
		pos.column < 0 || pos.column >= this.width) {
		return false;
	}
    
	return this.placeTroops(pos.column, pos.row, player);
}

//Utilities
Phaser.Board.prototype.getSelectedTile = function getSelectedTile(tile) {
    for (var y = 0; y < this.tiles.length; ++y) {
        for (var x = 0; x < this.tiles[y].length; ++x) {
            if (this.tiles[y][x].hex.selected === true) {
                return this.tiles[y][x];
            }
        }
    }
}

Phaser.Board.prototype.canMoveToTile = function canMoveToTile(tile, fromTile) {
    var distX = fromTile.x - tile.x;
    var distY = fromTile.y - tile.y;
    
    if ((distX === 0 && distY === 0) || Math.abs(distX) > 1 || Math.abs(distY) > 1) {
        return false;   
    }
    
    if (fromTile.y % 2 === 0) {
        if (distX > 0 && distY !== 0) {
            return false;   
        }
    } else {
        if (distX < 0 && distY !== 0) {
            return false;   
        }
    }
    
    return true;
}

Phaser.Board.prototype.numTilesForPlayer = function getNumTilesForPlayer(id) {
    return this.getTilesForPlayer(id).length;
}

Phaser.Board.prototype.getTilesForPlayer = function getTilesForPlayer(id) {
    var tiles = [];
    
    for (var y = 0; y < this.tiles.length; ++y) {
        for (var x = 0; x < this.tiles[y].length; ++x) {
            if (this.tiles[y][x].ownerId === id) {
                tiles.push(this.tiles[y][x]);
            }
        }
    }
    
    return tiles;
}

Phaser.Board.prototype.getNeighboringTiles = function getNeighboringTiles(tile) {
	var neighbors = [];
	
	var x = tile.x;
	var y = tile.y;
	var isEven = y % 2 === 0;
	
	if (x - 1 >= 0) {
		neighbors.push(this.tiles[y][x - 1]);
	}
	
	if (x + 1 < this.width) {
		neighbors.push(this.tiles[y][x + 1]);
	}
	
	if (y - 1 >= 0) {
		neighbors.push(this.tiles[y - 1][x]);
	}
	
	if (y + 1 < this.height) {
		neighbors.push(this.tiles[y + 1][x]);	
	}
	
	if (isEven) {
		if (x + 1 < this.width) {
			if (y + 1 < this.height) {
				neighbors.push(this.tiles[y + 1][x + 1]);
			}
			
			if (y - 1 >= 0) {
				neighbors.push(this.tiles[y - 1][x + 1]);
			}
		}
	} else {
		if (x - 1 >= 0) {
			if (y + 1 < this.height) {
				neighbors.push(this.tiles[y + 1][x - 1]);
			}
			
			if (y - 1 >= 0) {
				neighbors.push(this.tiles[y - 1][x - 1]);
			}
		}
	}
	
	return neighbors;
}