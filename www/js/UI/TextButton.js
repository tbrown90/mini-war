function rectText(params) {
	function contains(x, y) {
		return rect.contains(x, y);	
	}
    
    function render() {
        Phaser.UIRect(params);
    }
	
    var rect = new Phaser.Rectangle(params.x, params.y, params.width, params.height);
	
	var text = game.add.text(params.x + params.width / 2, params.y + params.height / 2, params.text, params.style);
	
	if (params.anchor != undefined) {
		text.anchor.set(params.anchor);
	}
	
	return {
		rect: rect,
		text: text,
		contains: contains,
        render: render
	};
}

Phaser.TextButton = rectText;