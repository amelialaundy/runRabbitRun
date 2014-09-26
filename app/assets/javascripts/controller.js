function PlayerController() {
	this.view = new View();
	this.playerOptions = {
      lat: null,
      lng: null,
      id: null,
      game_id: null
    };

    this.player = null;
    this.timer = null;
    this.updatePlayerUrl = '/player/update_position'
    var self = this
}

PlayerController.prototype = {
	start: function() {
		this.bindEvents();
		this.view.initializeMap();
		this.createPlayerMarkers();
		this.setUpTimer(1000);
	},

	bindEvents: function() {
		document.addEventListener("keyup", this.movePlayerMarker.bind(this), false);
	},

	setUpTimer: function(interval) {
		var self = this
		self.timer = setInterval(this.sendPlayerPosition.bind(this), interval)
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
			clearInterval(this.timer)
			alert("end of game!!")
		}

	},

	createPlayerMarkers: function() {
		this.playerOptions.lat = 
		this.playerOptions.lng = 
		this.playerOptions.id = 
		this.playerOptions.game_id =
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