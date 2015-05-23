var Player = function Player(id) {
	var actor = new Actor(id);
	actor.isAi = false;
	
	return actor;
}