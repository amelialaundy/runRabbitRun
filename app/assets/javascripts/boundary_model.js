function Boundary(mapCentre) {
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


		// this.biggestLat = this.centreLat + distanceToFarthestLat
		// this.biggestLng = this.centreLng + distanceToFarthestLng
		// this.smallestLat = this.centreLat - distanceToFarthestLat
		// this.smallestLng = this.centreLng - distanceToFarthestLng
	}
}