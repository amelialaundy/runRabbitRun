function Controller() {
	this.view = new View();
	this.playerOptions = {
      lat: -41.297656,
      lng: 174.773259,
      id: 1
    };
    this.player = null;
    this.updatePlayerUrl = '/player/update_position'
}

Controller.prototype = {
	start: function() {
		this.bindEvents();
		this.view.initializeMap();
		this.createPlayerMarkers(this.playerOptions);
		this.setUpTimer();
	},

	bindEvents: function() {
		document.addEventListener("keyup", this.movePlayerMarker.bind(this), false);
	},

	setUpTimer: function() {
		var self = this
		setInterval(this.sendPlayerPosition.bind(this), 1000)
	},

	sendPlayerPosition: function() {
		$.ajax({
		  type: "POST",
		  url: this.updatePlayerUrl,
		  data: this.playerOptions,
		  success: console.log("success")
		});
	},

	createPlayerMarkers: function(player) {
		this.player = new PlayerMarker(player);
	    this.view.renderMapPlayerMarkers(this.player);
	},

	movePlayerMarker: function(e) {
		// 37 = down
		// 38 = up
		// 39 = right
		// 40 = down

		if (e.keyCode == 38) {
			this.playerOptions.lat = this.playerOptions.lat + 0.00008
			this.playerOptions.lng = this.playerOptions.lng

			// these two lines alter the google maps marker object itself, although I can;t get them to actually show their changed positions on the map
			// this.playerOptions.lat = this.view.googlePlayer.position.k
			// this.playerOptions.lng = this.view.googlePlayer.position.B
			// this.createPlayerMarkers(this.playerOptions)

		} else if (e.keyCode == 39) {
			this.playerOptions.lat = this.playerOptions.lat
			this.playerOptions.lng = this.playerOptions.lng + 0.00008
		} else if (e.keyCode == 40) {
			this.playerOptions.lat = this.playerOptions.lat - 0.00008
			this.playerOptions.lng = this.playerOptions.lng 
		} else if (e.keyCode == 37) {
			this.playerOptions.lat = this.playerOptions.lat
			this.playerOptions.lng = this.playerOptions.lng - 0.00008
		}
		this.view.moveMarker(this.playerOptions.lat, this.playerOptions.lng)
	}

}