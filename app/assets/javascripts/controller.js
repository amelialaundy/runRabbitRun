function PlayerController() {
	this.view = new View();
	this.playerOptions = {
      lat: null,
      lng: null,
      id: null,
      game_id: null,
      kind: null
    };

    this.biggestLat = null
    this.biggestLng = null
    this.smallestLat = null
    this.smallestLng = null

    this.locationTimer = null;
    this.updatePlayerUrl = '/player/update_position'
    var self = this
}

PlayerController.prototype = {
	start: function() {
		this.bindEvents();
		this.view.initializeMap();
		this.createPlayerMarkers();
		this.setMapBoundaries();
		this.setUpLocationTimer(1000);
	},

	bindEvents: function() {
		document.addEventListener("keyup", this.movePlayerMarker.bind(this), false);
	},

	setUpLocationTimer: function(interval) {
		var self = this
		self.locationTimer = setInterval(this.sendPlayerPosition.bind(this), interval)
	},

	sendPlayerPosition: function() {
		$.ajax({
		  type: "POST",
		  url: this.updatePlayerUrl,
		  data: this.playerOptions,
		  success: this.checkWinState.bind(this)
		});
	},

	checkWinState: function(data) {
		
		if (data.game_status == true) {
			clearInterval(this.locationTimer)
			// $('document').off()
			document.removeEventListener("keyup", this.movePlayerMarker.bind(this), false);
			alert("end of game!!")
		}

	},

	createPlayerMarkers: function() {
		this.playerOptions.id = this.view.playerIdDiv
		this.playerOptions.lat = this.view.playerLatDiv
		this.playerOptions.lng = this.view.playerLngDiv
		this.playerOptions.game_id = this.view.gameIdDiv
		this.playerOptions.kind = this.view.playerKindDiv
		this.player = new PlayerMarker(this.playerOptions);
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
	},

	setMapBoundaries: function() {
		centreLat = this.view.lat;
		centreLng = this.view.lng;
		biggestLat = centreLat + 0.007337
		biggestLng = centreLng + 0.012514
		smallestLat = centreLat - 0.007337
		smallestLng = centreLng - 0.012514
	}

}