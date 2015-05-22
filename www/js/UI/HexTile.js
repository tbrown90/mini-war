Phaser.HexTile = function hexTile(hexParams) {

	function render() {
		this.hex.render();	
	}
	
	function click() {
		this.hex.selected = !this.hex.selected;
	}
	
	function update() {
		text.text = this.numTroops + '';
	}
	
	var uiHex = new Phaser.UIHex(hexParams);
	var text = game.add.text(hexParams.center.x, hexParams.center.y, '', hexParams.textStyle);
	text.anchor.set(0.5, 0.5);
	
	return {
		hex: uiHex,
		text: text,
		ownerId: -1,
		numTroops: 100,
		click: click,
		render: render,
		update: update
	};
}