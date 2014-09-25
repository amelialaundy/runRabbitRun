function Controller() {
	this.view = new View();
	this.playerOptions = {
      lat: -41.297656,
      lng: 174.773259,
    };
}

Controller.prototype = {
	start: function() {
		this.view.initializeMap();
		this.createPlayerMarkers();
	},

	createPlayerMarkers: function() {
		var newMarker = new PlayerMarker(this.playerOptions);
	    this.view.renderMapPlayerMarkers(newMarker);
	}


}