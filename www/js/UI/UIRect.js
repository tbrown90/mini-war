function uiRect(rectParams) {
	
	if (rectParams.borderColor === undefined) {
		rectParams.borderColor = 0xFFFFFF;	
	}
	
	if (rectParams.borderWidth === undefined) {
		rectParams.borderWidth = 1;	
	}
	
	if (rectParams.fillColor) {
		graphics.beginFill(rectParams.fillColor);	
	}
	
	graphics.lineStyle(rectParams.borderWidth, rectParams.borderColor, 1);
    graphics.drawRect(rectParams.x, rectParams.y, rectParams.width, rectParams.height);
	
	if (rectParams.fillColor) {
		graphics.endFill();	
	}
	
	return new Phaser.Rectangle(rectParams.x, rectParams.y, rectParams.width, rectParams.height);
}

Phaser.UIRect = uiRect;