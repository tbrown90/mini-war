var play = function play(game) {
	console.log("Play State");
};

var board = {
	width: 0,
	height: 0,
	tileWidth: 0,
	tileHeight: 0,
	tiles: []
};

function createBoard() {
	var w = game.world.width
	var h = game.world.height;
	var tileSize = config.tileSize;
	var tileSizeX2 = tileSize * 2;

	var distX = Math.sqrt(3) / 2 * tileSizeX2;
	var halfDistX = distX / 2;
	var distY = tileSizeX2 * (3 / 4);
	var halfDistY = distY / 2;

	board.width = w / distX;
	board.height = h / distY;
	board.tileWidth = distX;
	board.tileHeight = tileSize * 1.5;

	var hexParams = {
		size: tileSize,
		fillColor: 0xff0000,
		borderColor: 0x0000ff,
		borderWidth: 5,
		visible: true
	};

	var xOff = 0;
	var yOff = -halfDistY / 2;
	for (var y = 0; y <= board.height; ++y) {
		board.tiles.push([]);
		for (var x = 0; x <= board.width; ++x) {
			var center = new PIXI.Point(x * distX + xOff, y * distY + yOff);

			hexParams.visible = true;

			if (center.x - halfDistX < 0 ||
				center.x + halfDistX > w ||
				center.y - halfDistY < 0 ||
				center.y + halfDistY > h) {
				console.log('Invisible');
				hexParams.visible = false;
			}

			hexParams.center = center;

			board.tiles[y].push(Phaser.UIHex(hexParams));
		}

		xOff = 0;
		if (y % 2 == 0) {
			xOff = -halfDistX;
		}
	}
}

function renderBoard() {
	for (var y = 0; y < board.height; ++y) {
		for (var x = 0; x < board.width; ++x) {
			board.tiles[y][x].render();
		}
	}
}

function updateBoard(pointer) {
	var x = pointer.positionDown.x;
	var y = pointer.positionDown.y;

	var row = Math.floor(y / board.tileHeight);
	var rowIsEven = row % 2 === 0;
	var column = 0;

	var halfWidth = board.tileWidth / 2;
	if (!rowIsEven) {
		column = Math.floor((x - halfWidth) / board.tileWidth);
	} else {
		column = Math.floor(x / board.tileWidth);
	}
	
	var relY = y - (row * board.tileHeight);
	var relX = 0;

	if (!rowIsEven) {
		relX = (x - (column * board.tileWidth)) - halfWidth;
	} else {
		relX = x - (column * board.tileWidth);
	}

	var c = config.tileSize / 2;
	var m = c / halfWidth;
	
	if (relY < (-m * relX) + c)
	{
		row--;
		if (rowIsEven) {
			column--;
		}
		
	} else if (relY < (m * relX) - c)
	{
		row--;
		if (!rowIsEven) {
			column++;
		}
	}
	
	if (row < 0 || row >= board.height ||
		column < 0 || column >= board.width) {
		return;	
	}
	
	console.log('Tile: ', row, column, board.tiles[row][column]);
	var tile = board.tiles[row][column];
	tile.renderParams.fillColor = 1 / tile.renderParams.fillColor;
}

play.prototype = {
	create: function create() {
		console.log("Play State: Create");
		graphics = game.add.graphics(0, 0);
		game.input.onUp.add(updateBoard, this);
		createBoard();
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
		renderBoard();
	}
}