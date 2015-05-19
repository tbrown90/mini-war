function createBoard() {
    var w = game.world.width
	var h = game.world.height;
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
    this.xOffset = (w - (distX * this.width) - halfDistX) / 2;
    this.yOffset = 0;

	var hexParams = {
		size: tileSize,
		fillColor: 0xff0000,
		borderColor: 0x0000ff,
		borderWidth: 5,
		visible: true
	};

    var xOff = this.xOffset;
    console.log(xOff);
	var yOff = -halfDistY / 2;
	for (var y = 0; y < this.height; ++y) {
        if (this.tiles[y] === undefined || this.tiles[y].length > 0) {
		  this.tiles.push([]);
        }
        
		for (var x = 0; x < this.width; ++x) {
			var center = new PIXI.Point((x + 1) * distX + xOff, (y + 1) * distY + yOff);

			hexParams.visible = true;

			hexParams.center = center;

			this.tiles[y].push(Phaser.UIHex(hexParams));
		}

		if (y % 2 == 0) {
			xOff -= halfDistX;
		} else {
            xOff += halfDistX;   
        }
	}
    
    return this;
}


Phaser.Board = createBoard;

Phaser.Board.prototype.render = function renderBoard() {
    for (var y = 0; y < this.height; ++y) {
		for (var x = 0; x < this.width; ++x) {
			this.tiles[y][x].render();
		}
	}
}

Phaser.Board.prototype.update = function updateBoard(pointer) {
    var x = pointer.positionDown.x - this.xOffset;
	var y = pointer.positionDown.y - this.yOffset;

	var row = Math.floor(y / this.tileHeight);
	var rowIsEven = row % 2 === 0;
	var column = 0;

	var halfWidth = this.tileWidth / 2;
	if (rowIsEven) {
		column = Math.floor((x - halfWidth) / this.tileWidth);
	} else {
		column = Math.floor(x / this.tileWidth);
	}
	
	var relY = y - (row * this.tileHeight);
	var relX = 0;

	if (rowIsEven) {
		relX = (x - (column * this.tileWidth)) - halfWidth;
	} else {
		relX = x - (column * this.tileWidth);
	}

	var c = config.tileSize / 2;
	var m = c / halfWidth;
	
	if (relY < (-m * relX) + c)
	{
		row--;
		if (!rowIsEven) {
			column--;
		}
		
	} else if (relY < (m * relX) - c)
	{
		row--;
		if (rowIsEven) {
			column++;
		}
	}
	
	if (row < 0 || row >= this.height ||
		column < 0 || column >= this.width) {
		return;	
	}
	
	console.log('Tile: ', row, column, this.tiles[row][column]);
	var tile = this.tiles[row][column];
	tile.renderParams.fillColor = 1 / tile.renderParams.fillColor;
}