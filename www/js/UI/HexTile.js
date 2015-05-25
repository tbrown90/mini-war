Phaser.HexTile = function hexTile(hexParams) {

	function render() {
		this.hex.render();	
	}
	
	function click() {
		this.hex.selected = !this.hex.selected;
	}
	
	function update() {
		var text = '-';
		if (this.numTroops > 0) {
			text = this.numTroops + '';	
		}
		
		this.troopText.text = text;
	}
	
	var uiHex = new Phaser.UIHex(hexParams);
	var troopText = game.add.text(hexParams.center.x, hexParams.center.y, '', hexParams.textStyle);
	troopText.anchor.set(0.5, 0.5);
	
	return {
		hex: uiHex,
		troopText: troopText,
		ownerId: -1,
		numTroops: 0,
		click: click,
		render: render,
		update: update,
        x: hexParams.x,
        y: hexParams.y
	};
}