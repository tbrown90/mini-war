var scripts = [
	'js/GameStates/boot.js',
	'js/GameStates/mainmenu.js',
	'js/GameStates/play.js',
	'js/GameStates/preload.js',
	'js/game.js',
	'js/UI/UIRect.js',
	'js/UI/UIHex.js',
    'js/UI/Board.js',
	'js/UI/HexTile.js',
	'js/UI/TextButton.js',
	'js/Player/Actor.js',
	'js/Player/Player.js',
	'js/Player/AI.js'
];

var app = {
    initialize: function() {
        this.bindEvents();
		this.loadScripts();
    },
    
	loadScripts: function loadScripts() {
        var loadedCount = 0;
        function loadCallback() {
            loadedCount++;
            if (loadedCount === scripts.length) {
                var interval = setInterval(function start() {
                    if (boot && preload && mainMenu && play) {
                        gameStart();
                        clearInterval(interval);
                    }
                }, 250);
            }
        }
        
		for (var i = 0; i < scripts.length; ++i) {
			utilities.loadScript(scripts[i], loadCallback);	
		}
	}, 
	
	bindEvents: function bindEvents() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

	onDeviceReady: function onDeviceReady() {
        app.receivedEvent('deviceready');
    },

    receivedEvent: function receivedEvent(id) {
        console.log('Received Event: ' + id);
    }
};