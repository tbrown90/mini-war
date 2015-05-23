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

function loadScript(url, callback) {
	// Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

function worldPositionToTilePosition(x, y, tileWidth, tileHeight) {
	var row = Math.floor(y / tileHeight);
	var rowIsEven = row % 2 === 0;
	var column = 0;

	var halfWidth = tileWidth / 2;
	if (rowIsEven) {
		column = Math.floor((x - halfWidth) / tileWidth);
	} else {
		column = Math.floor(x / tileWidth);
	}

	var relY = y - (row * tileHeight);
	var relX = 0;

	if (rowIsEven) {
		relX = (x - (column * tileWidth)) - halfWidth;
	} else {
		relX = x - (column * tileWidth);
	}

	var c = tileHeight;
	var m = c / halfWidth;

	if (relY < (-m * relX) + c) {
		row--;
		if (!rowIsEven) {
			column--;
		}

	} else if (relY < (m * relX) - c) {
		row--;
		if (rowIsEven) {
			column++;
		}
	}
	
	return {
		row: row,
		column: column
	}
}

function randomRange(min, max) {
	return Math.random() * (max - min) + min;
}

var utilities = {
	getWidth: getWidth,
	getHeight: getHeight,
	loadScript: loadScript,
	worldPositionToTilePosition: worldPositionToTilePosition,
	randomRange: randomRange
};
