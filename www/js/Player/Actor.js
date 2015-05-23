var Actor = function Actor(id) {
	this.id = id;
	
	this.troopsToPlace = 25;
	this.placeTrooper = function placeTrooper() {
		if (this.troopsToPlace > 0) {
			this.troopsToPlace -= 1;	
			return 1;
		}
		
		return 0;
	}
};