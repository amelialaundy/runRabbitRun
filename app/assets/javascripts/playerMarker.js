function PlayerMarker(options) {
	this.options = options
	console.log(options.game_id)
	// this.id = options.id;
	this.currentLat = options.lat;
	this.currentLng = options.lng;
	// this.kind = options.kind;
	// this.gameId = options.gameId;
}

PlayerMarker.prototype = {
	move: function(change) {
		console.log("**********"+this.options)
		this.options.lat += change[0]
		this.options.lng += change[1]
		console.log("********** after"+this.options.lng)
	}
}