function PlayerMarker(options) {
	this.options = options
	this.currentLat = options.lat;
    this.currentLng = options.lng;
}

PlayerMarker.prototype = {
	move: function(change) {
		console.log(change)
		this.options.lat += change[0]
		this.options.lng += change[1]
	}
}