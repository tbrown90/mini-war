function drawRectText(params) {
	function contains(x, y) {
		return rect.contains(x, y);	
	}
	
	var rect = Phaser.UIRect(params);
	
	var text = game.add.text(params.x + params.width / 2, params.y + params.height / 2, params.text, params.style);
	
	if (params.anchor != undefined) {
		text.anchor.set(params.anchor);
	}
	
	return {
		rect: rect,
		text: text,
		contains: contains
	};
}

Phaser.TextButton = drawRectText;