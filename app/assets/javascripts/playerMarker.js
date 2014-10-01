function PlayerMarker(options) {
	this.options = options
	this.currentLat = options.lat;
    this.currentLng = options.lng;
}

PlayerMarker.prototype = {
	move: function(change) {
		this.options.lat += change[0]
		this.options.lng += change[1]
	},

	isRabbit: function() {
		return this.options.kind === 'rabbit'
	}
}
