function PlayerController() {
	this.view = new View();
	this.powerUp = new PowerUp(this.view)
	this.abilityController = new AbilityController(this.view, this);

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

    self = this
}

PlayerController.prototype = {
	start: function() {
		this.bindEvents();
		this.view.initializeMap();
		this.createPlayerMarkers();
		this.setMapBoundaries();
		this.setUpLocationTimer(1000);
		this.setUpRabbitLocationTimer(10000);
		this.powerUp.showPowerUp(this.powerUp.lat,this.powerUp.lng);
	},

	bindEvents: function() {

		$('body').on("keyup", this.movePlayerMarker);

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
			clearInterval(this.locationTimer);
			this.sendWinMessageToAll()
			this.view.showWinModal()
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
			var new_lat = self.playerOptions.lat + 0.00008
			if (new_lat < self.biggestLat && new_lat > self.smallestLat) {

				self.playerOptions.lat = new_lat

			}
		// 39 = right
		} else if (e.keyCode == 39) {
			var new_lng = self.playerOptions.lng + 0.00008
			if (new_lng < self.biggestLng && new_lng > self.smallestLng) {
				self.playerOptions.lng = new_lng
			}
		// 40 = down
		} else if (e.keyCode == 40) {
			var new_lat = self.playerOptions.lat - 0.00008
			if (new_lat < self.biggestLat && new_lat > self.smallestLat) {
				self.playerOptions.lat = new_lat
			}
		// 37 = left
		} else if (e.keyCode == 37) {
			var new_lng = self.playerOptions.lng - 0.00008
			if (new_lng < self.biggestLng && new_lng > self.smallestLng) {
				self.playerOptions.lng = new_lng
			}
		// 70 = f key
		} else if (e.keyCode == 70) {
			self.abilityController.addSpeed()
		}

		self.view.moveMarker(self.playerOptions.lat, self.playerOptions.lng)
		if(self.powerUp.collectAbility(self.playerOptions)){
			self.abilityController.addSpeed();
		}
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
	},


};
