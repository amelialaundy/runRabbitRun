function Boundary(mapCentre, player) {
	this.player = player
	this.centreLat = mapCentre[0]
	this.centreLng = mapCentre[1]
	distanceToFarthestLat = 0.003882
	distanceToFarthestLng = 0.007397
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

	checkWithinLimits: function(coords) {
		newLat = coords[0] + this.player.currentLat;
		newLng = coords[1] + this.player.currentLng;
		if (newLat < self.boundary.mapLimits.biggestLat && newLat > self.boundary.mapLimits.smallestLat) {
			if (newLng < self.boundary.mapLimits.biggestLng && newLng > self.boundary.mapLimits.smallestLng) {
				return true
			}
		} else {
			return false
		}
	}
} 
 
 
