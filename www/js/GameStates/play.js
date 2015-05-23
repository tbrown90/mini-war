var GameState = {
	initializing: 0,
	playerSetup: 1,
	playing: 2
};

var play = function play(game) {
	console.log("Play State");
};

play.prototype = {
	create: function create() {
		console.log("Play State: Create");
		graphics = game.add.graphics(0, 0);
	
		this.gameState = GameState.initializing;	
		this.initializeBoard();
		this.initializePlayers();
	},
	
	//INITIALIZSERS
	initializeBoard: function initializeBoard() {
		var centerX = game.world.width / 2;
		var y = 25;
		var textStyle = {
			font: "24px Arial", 
			fill: "#ccc", 
			align: "center"
		};
		this.gameText = game.add.text(centerX, y, 'Initializing Board', textStyle);
		this.gameText.anchor.set(0.5, 0.5);
		
		this.board = new Phaser.Board();
		game.input.onUp.add(this.clickBoard, this);
	},
	
	initializePlayers: function initializePlayers() {
		this.setText('Initializing Players');
		
		this.players = [];
		for (var i = 0; i < config.numPlayers; ++i) {
			if (i < config.numAi) {
				this.players.push(new AI(i));	
			} else {
				this.players.push(new Player(i));	
			}
		}
		
		this.currentTurn = 0;
		
		this.gameState = GameState.playerSetup;
	},

	update: function update() {
		console.log("Play State: Update");
		this.board.update();
		
		var player = getPlayer();
		if (player.isAi) {
			player.update(this);
		}
	},

	play: function play() {
		console.log("Play State: Play");
	},

	shutdown: function shutdown() {
		console.log("Play State: Shutdown");
	},

	render: function render() {
		graphics.clear();
		this.board.render();
	},
	
	nextTurn: function nextTurn() {
		this.currentTurn++;
		if (this.currentTurn >= this.players.length) {
			this.currentTurn = 0;	
		}
		
		var text = this.players[this.currentTurn].isAi ? 'AI ' : 'Player ';
		text += this.currentTurn + '\'s turn';
		this.setText(text);
		
		this.board.deselect();
	}
		
	//UTILITIES
	setText: function setText(text) {
		this.gameText.text = text;
	},
	
	getPlayer: function getPlayer() {
		return this.players[this.currentPlayer];	
	},
	
	canClickTile: function canClickTile() {
		return this.players[this.currentTurn].isAi === false;	
	},
	
		
	//INTERACTIVES
	clickBoard: function clickBoard(pointer) {
		if (this.canClickTile() === false) {
			return;	
		}
		
		var player = this.players[this.currentTurn];
		switch (this.gameState) {
			case GameState.playing:
				this.board.clickBoard(pointer, this);
				this.nextTurn();
				break;
				
			case GameState.playerSetup:
				var troops = player.placeTrooper();
				this.board.placeTrooper(pointer, player.id, troops);
				break;				
		}
	}
}