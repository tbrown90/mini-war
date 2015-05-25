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
        this.setupUi();
		this.initializePlayers();
	},
	
	//INITIALIZSERS
	initializeBoard: function initializeBoard() {
		this.board = new Phaser.Board();
		game.input.onUp.add(this.clickBoard, this);
	},
	
	initializePlayers: function initializePlayers() {
		this.updateText();
		
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

    setupUi: function setupUi() {
        var centerX = game.world.width / 2;
		var y = 25;
		var gameTextStyle = {
			font: "24px Arial", 
			fill: "#ccc", 
			align: "center"
		};
        this.gameText = game.add.text(centerX, y, 'Initializing Board', gameTextStyle);
		this.gameText.anchor.set(0.5, 0.5);
        
        this.playerOneText = game.add.text(25, y, 'Player One', gameTextStyle);
        this.playerOneText.anchor.set(0, 0.5);
        this.playerOneTextScore = game.add.text(25, y + 28, '0', gameTextStyle);
        this.playerOneTextScore.anchor.set(0, 0.5);
        
        
        this.playerTwoText = game.add.text(game.world.width - 25, y, 'Player Two', gameTextStyle);
        this.playerTwoText.anchor.set(1, 0.5);
        this.playerTwoTextScore = game.add.text(game.world.width - 25, y + 28, '0', gameTextStyle);
        this.playerTwoTextScore.anchor.set(1, 0.5);
    },
    
	update: function update() {
		console.log("Play State: Update");
		this.board.update();
		
		var player = this.getPlayer();
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
		
		this.updateText();
		
		this.board.deselect();
        
        if (this.gameState === GameState.playerSetup && this.allTroopsPlaced() === true) {
            console.log('Playing');
            this.gameState = GameState.playing;   
        }
	},
		
	//UTILITIES
	updateText: function updateText() {
		var text = "";
        switch (this.gameState) {
            case GameState.initializing:
                text = "Initializing Board";
                break;
            case GameState.playerSetup:
                text = "Troop Setup";
                break;
            case GameState.playing:
                text = "Playing";
                break;
        }
        
        this.gameText.text = text;
        
        var p1Score = this.board.numTilesForPlayer(0);
        var p2Score = this.board.numTilesForPlayer(1);
        
        this.playerOneTextScore.text = p1Score;
        this.playerTwoTextScore.text = p2Score;
	},
	
	getPlayer: function getPlayer() {
		return this.players[this.currentTurn];	
	},
	
	canClickTile: function canClickTile() {
		return this.players[this.currentTurn].isAi === false;	
	},
    
    allTroopsPlaced: function allTroopsPlaced() {
        for (var i = 0; i < this.players.length; ++i) {
            if (this.players[i].troopsToPlace != 0) {
                return false;
            }
        }
        
        return true;
    },
			
	//INTERACTIVES
	clickBoard: function clickBoard(pointer) {
		if (this.canClickTile() === false) {
			return;	
		}
		
		var player = this.players[this.currentTurn];
		switch (this.gameState) {
			case GameState.playing:
				if (this.board.clickBoard(pointer, player.id)) {
                    this.nextTurn();    
                }
				break;
				
			case GameState.playerSetup:
				var placed = this.board.placeTrooper(pointer, player);
                if (placed === true) {
                    this.nextTurn();
                }
				break;				
		}
	}
}