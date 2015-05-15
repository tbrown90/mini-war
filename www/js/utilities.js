function getWidth() {
	var width = window.innerWidth 
		|| document.documentElement.clientWidth 
		|| document.body.clientWidth;
	
	return width;
}

function getHeight() {
	var height = window.innerHeight 
		|| document.documentElement.clientHeight 
		|| document.body.clientHeight;
	
	return height;
}

function drawRect(x, y, width, height, borderColor, borderWidth, fillColor) {
	if (borderColor === undefined) {
		borderColor = 0xFFFFFF;	
	}
	
	if (borderWidth === undefined) {
		borderWidth = 1;	
	}
	
	if (fillColor) {
		graphics.beginFill(fillColor);	
	}
	
	graphics.lineStyle(borderWidth, borderColor, 1);
    graphics.drawRect(x, y, width, height);
	
	if (fillColor) {
		graphics.endFill();	
	}
	
	return new Phaser.Rectangle(x, y, width, height);
}

var utilities = {
	drawRect: drawRect,
	getWidth: getWidth,
	getHeight: getHeight
};