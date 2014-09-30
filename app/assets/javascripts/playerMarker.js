function PlayerMarker(options) {
	this.options = options
	// this.id = options.id;
	// this.lat = options.lat;
	// this.lng = options.lng;
	// this.kind = options.kind;
	// this.gameId = options.gameId;
}

PlayerMarker.prototype = {
	move: function(change) {
		this.options.lat += change[0]
		this.options.lng += change[1]
	}
}