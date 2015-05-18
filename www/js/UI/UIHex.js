function uiHex(hexParams) {
	
	function corner(center, size, i) {
		var deg = 60 * i + 30;
		var rad = Math.PI / 180 * deg;
		
		return new PIXI.Point(center.x + size * Math.cos(rad),
						 center.y + size * Math.sin(rad));
	}
	
	if (hexParams.fillColor === undefined) {
		hexParams.fillColor = 0xFFFFFF;	
	}
	
	if (hexParams.borderColor !== undefined && hexParams.borderWidth !== undefined) {
		graphics.lineStyle(hexParams.borderWidth, hexParams.borderColor, 1);
	}
	
	graphics.beginFill(hexParams.fillColor);
	
	var center = hexParams.center;
	var size = hexParams.size;
	var points = [];
	for (var i = 0; i < 6; ++i) {
		points.push(corner(center, size, i));	
	}
	points.push(points[0]);
	
	graphics.drawPolygon(points);
	
	graphics.endFill();	
	
	return {
		center: center,
		size: size,
		points: points
	};
}

Phaser.UIHex = uiHex;