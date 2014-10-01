function Boundary(mapCentre, player) {
	this.player = player
	this.centreLat = mapCentre[0]
	this.centreLng = mapCentre[1]
	distanceToFarthestLat = 0.003882
	distanceToFarthestLng = 0.007397
	this.setMapLimits();
}

Boundary.prototype = {
	setMapLimits: function() {
		this.mapLimits = {
			biggestLat: this.centreLat + distanceToFarthestLat,
			biggestLng: this.centreLng + distanceToFarthestLng,
			smallestLat: this.centreLat - distanceToFarthestLat,
			smallestLng: this.centreLng - distanceToFarthestLng
		}
	},

	checkWithinLimits: function(vector) {
		if (vector == null) {
			return false
		}
		newLat = vector[0] + this.player.options.lat;
		newLng = vector[1] + this.player.options.lng;
		if (newLat < self.boundary.mapLimits.biggestLat && newLat > self.boundary.mapLimits.smallestLat) {
			if (newLng < self.boundary.mapLimits.biggestLng && newLng > self.boundary.mapLimits.smallestLng) {
				return true
			}
		} else {
			return false
		}
	}
} 
 
 
