function Controller() {
	this.view = new View();
	this.playerOptions = {
      lat: -41.297656,
      lng: 174.773259,
    };
    this.player = null
}

Controller.prototype = {
	start: function() {
		this.bindEvents();
		this.view.initializeMap();
		this.createPlayerMarkers(this.playerOptions);
	},

	bindEvents: function() {
		document.addEventListener("keyup", this.movePlayerMarker.bind(this), false);
	},

	createPlayerMarkers: function(player) {
		this.player = new PlayerMarker(player);
	    this.view.renderMapPlayerMarkers(this.player);
	},

	movePlayerMarker: function(e) {
		console.log(this)
		// 37 = down
		// 38 = up
		// 39 = right
		// 40 = down

		if (e.keyCode == 38) {
			this.view.googlePlayer.position.k = -41.293430
			this.view.googlePlayer.position.B = 174.775850
			this.playerOptions.lat = this.view.googlePlayer.position.k
			this.playerOptions.lng = this.view.googlePlayer.position.B
			console.log(this.view.googlePlayer.position.k)
			console.log(this.view.googlePlayer.position.B)
			this.createPlayerMarkers(this.playerOptions)
		}
	}

}