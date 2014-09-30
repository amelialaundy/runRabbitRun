function PlayerMarker(options) {
	this.options = options
	// this.id = options.id;
	this.currentLat = options.lat;
	this.currentLng = options.lng;
	// this.kind = options.kind;
	// this.gameId = options.gameId;
}

PlayerMarker.prototype = {
	move: function(change) {
		console.log(change)
		this.currentLat += change[0]
		this.currentLng += change[1]
	}
}