function PlayerController() {
	this.view = new View();
	this.abilityController = new AbilityController(this.view);
	
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
    this.rabbitTimer = null;
    this.updatePlayerUrl = '/player/update_position'
    this.updateRabbitUrl = '/rabbit/update_rabbit_street_view'
    this.sendWinMessageUrl = '/player/send_win_message'

    var self = this
}

PlayerController.prototype = {
	start: function() {
		this.bindEvents();
		this.view.initializeMap();
		this.createPlayerMarkers();
		this.setMapBoundaries();
		this.setUpLocationTimer(1000);
		this.setUpRabbitLocationTimer(10000);
	},

	bindEvents: function() {
		document.addEventListener("keyup", this.movePlayerMarker.bind(this), false);

	},

	setUpLocationTimer: function(interval) {
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
			this.sendWinMessageToAll()
		}
	},

	sendWinMessageToAll:function(){
		var self = this
		$.ajax({
			type: "POST",
			url: this.sendWinMessageUrl,
			data: {player_stats: self.playerOptions},
		})
	},

	createPlayerMarkers: function() {
		this.playerOptions.id = this.view.playerId
		this.playerOptions.lat = this.view.playerLat
		this.playerOptions.lng = this.view.playerLng
		this.playerOptions.game_id = this.view.gameId
		this.playerOptions.kind = this.view.playerKind
		this.player = new PlayerMarker(this.playerOptions);
	    this.view.renderMapPlayerMarkers(this.player);
	},

	movePlayerMarker: function(e) {
		// 38 = up
		if (e.keyCode == 38) {
			var new_lat = this.playerOptions.lat + 0.00008
			if (new_lat < this.biggestLat && new_lat > this.smallestLat) {

				this.playerOptions.lat = new_lat

			}
		// 39 = right
		} else if (e.keyCode == 39) {
			var new_lng = this.playerOptions.lng + 0.00008
			if (new_lng < this.biggestLng && new_lng > this.smallestLng) {
				this.playerOptions.lng = new_lng
			}
		// 40 = down
		} else if (e.keyCode == 40) {
			var new_lat = this.playerOptions.lat - 0.00008
			if (new_lat < this.biggestLat && new_lat > this.smallestLat) {
				this.playerOptions.lat = new_lat
			}
		// 37 = left
		} else if (e.keyCode == 37) {
			var new_lng = this.playerOptions.lng - 0.00008
			if (new_lng < this.biggestLng && new_lng > this.smallestLng) {
				this.playerOptions.lng = new_lng
			}
		}

		this.view.moveMarker(this.playerOptions.lat, this.playerOptions.lng)
	},

	setMapBoundaries: function() {
		centreLat = this.view.lat;
		centreLng = this.view.lng;
		farthestLat = 0.003882
		farthestLng = 0.007397
		this.biggestLat = centreLat + farthestLat
		this.biggestLng = centreLng + farthestLng
		this.smallestLat = centreLat - farthestLat
		this.smallestLng = centreLng - farthestLng
	},


	setUpRabbitLocationTimer: function(interval) {
		this.setUpRabbitLocationPusher();
		self.rabbitTimer = setInterval(this.sendRabbitPosition.bind(this), interval)
	},

	// Only sends message if player is 'rabbit'
	sendRabbitPosition: function(){
		if(this.playerOptions.kind == 'rabbit'){
			$.ajax({
			  type: "POST",
			  url: this.updateRabbitUrl,
			  data: this.playerOptions,
			});
		}
	},
	// sets up pusher channel
	setUpRabbitLocationPusher: function(){
		var self = this
		var gameId = this.playerOptions.game_id
		this.pusher = new Pusher('7a73ab83106664465bfd');
		this.channel = this.pusher.subscribe('game_'+ gameId);
		this.channel.bind('show_rabbit_street_view_game', function(data) {
			self.view.showStreetView(data.message)
		});
		this.channel.bind('win_message', function(data){
			alert(data.message)
		});

	}

};
