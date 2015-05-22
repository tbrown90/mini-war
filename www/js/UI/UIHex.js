function uiHex(hexParams) {

	function render() {
		if (this.renderParams.visible === false) {
			return;
		}

		if (this.renderParams.fillColor === undefined) {
			this.renderParams.fillColor = 0xFFFFFF;
		}

		if (this.renderParams.borderColor !== undefined && this.renderParams.borderWidth !== undefined) {
			graphics.lineStyle(this.renderParams.borderWidth, this.renderParams.borderColor, 1);
		}

		var fillColor = this.selected ? this.renderParams.selectColor : this.renderParams.fillColor;	
		
		graphics.beginFill(fillColor);
		graphics.drawPolygon(this.points);
		graphics.endFill();
	}

	function corner(center, size, i) {
		var deg = 60 * i + 30;
		var rad = Math.PI / 180 * deg;

		return new Phaser.Point(center.x + size * Math.cos(rad),
			center.y + size * Math.sin(rad));
	}

	var center = hexParams.center;
	var size = hexParams.size;
	var points = [];
	for (var i = 0; i < 6; ++i) {
		points.push(corner(center, size, i));
	}

	points.push(points[0]);

	var hex = new Phaser.Polygon(points);

	return {
		hex: hex,
		center: center,
		size: size,
		width: points[5].x - points[3].x,
		height: points[1].y - points[4].y,
		points: points,
		selected: false,
		render: render,
		renderParams: {
			visible: hexParams.visible,
			fillColor: hexParams.fillColor,
			selectColor: hexParams.selectColor,
			borderColor: hexParams.borderColor,
			borderWidth: hexParams.borderWidth,
		}
	};
}

Phaser.UIHex = uiHex;