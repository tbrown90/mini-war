var scripts = [
	'js/GameStates/boot.js',
	'js/GameStates/mainmenu.js',
	'js/GameStates/play.js',
	'js/GameStates/preload.js',
	'js/game.js',
	'js/UI/UIRect.js',
	'js/UI/UIHex.js',
	'js/UI/TextButton.js'
];

var app = {
    initialize: function() {
        this.bindEvents();
		this.loadScripts();
    },
    
	loadScripts: function loadScripts() {
		for (var i = 0; i < scripts.length; ++i) {
			utilities.loadScript(scripts[i]);	
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
