function GameController() {
	this.view = new View();
	this.powerUp = new PowerUp(this.view)
	this.boundary = null
	this.abilityController = new AbilityController(this.view, this);

	this.playerOptions = {
      lat: null,
      lng: null,
      id: null,
      game_id: null,
      kind: null
    };

    this.locationTimer = null;
    this.rabbitTimer = null;
    this.updatePlayerUrl = '/player/update_position'
    this.updateRabbitUrl = '/rabbit/update_rabbit_street_view'
    this.sendWinMessageUrl = '/player/send_win_message'

    self = this
}

GameController.prototype = {
	start: function() {
		this.bindEvents();
		this.view.initializeMap();
		
		
		this.createPlayerMarkers();
		this.boundary = new Boundary([this.view.lat, this.view.lng], this.player);
		this.boundary.setMapLimits();
		// this.setMapBoundaries();
		this.setUpLocationTimer(1000);
		this.setUpRabbitLocationTimer(10000);
		this.powerUp.showPowerUp(this.powerUp.lat,this.powerUp.lng);
	},

	bindEvents: function() {
		$('body').on("keyup", this.movePlayerMarker);
	},
	unbindEvents: function() {
		$('body').off("keyup", this.movePlayerMarker)
	},

	setUpLocationTimer: function(interval) {
		self.locationTimer = setInterval(this.sendPlayerPosition.bind(this), interval)
	},

	sendPlayerPosition: function() {
		$.ajax({
		  type: "POST",
		  url: this.updatePlayerUrl,
		  data: self.player.options,
		  success: this.checkProximityToRabbit.bind(this)
		});
	},

	checkProximityToRabbit: function(data) {
		console.log(data)
		if (data['proximity'] == "win") {
			clearInterval(this.locationTimer)
			this.sendWinMessageToAll()
		} else if (data['proximity'] == "red") {
				this.view.showProximityAlert("red")
		} else if (data['proximity'] == "yellow") {
				this.view.showProximityAlert("yellow")
		} else {
				this.view.showProximityAlert("green")
		}

	},

	sendWinMessageToAll:function(){
		var self = this
		$.ajax({
			type: "POST",
			url: this.sendWinMessageUrl,
			data: {player_stats: self.player.options},
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
		var moveDistance = 0.00008
		// 38 = up
		if (e.keyCode == 38) {
			if (self.boundary.checkWithinLimits([moveDistance, 0.0 ])) {
				self.player.move([moveDistance, 0.0])
			}
		// 39 = right
		} else if (e.keyCode == 39) {
			// var newLng = self.player.currentLng + moveDistance
			if (self.boundary.checkWithinLimits([0.00, moveDistance])) {
				self.player.move([0.0, moveDistance])
			}
		// 40 = down
		} else if (e.keyCode == 40) {
			// var newLat = self.player.currentLat - moveDistance
			if (self.boundary.checkWithinLimits([-moveDistance, 0.0 ])) {
				self.player.move([-moveDistance, 0.0])
			}
		// 37 = left
		} else if (e.keyCode == 37) {
			// var newLng = self.player.currentLng - moveDistance
			if (self.boundary.checkWithinLimits([0.00, -moveDistance])) {
				self.player.move([0.0, -moveDistance])
			}
		// 70 = f key
		} else if (e.keyCode == 70) {
			self.abilityController.addSpeed()
		}
		self.view.moveMarker(self.player.options.lat, self.player.options.lng)

		if(self.powerUp.collectAbility(self.player.options)){
			self.abilityController.addSpeed();
			setTimeout(function(){self.abilityController.normalSpeed()},3000);
				self.powerUp = null
			setTimeout(function(){
				self.powerUp = new PowerUp(self.view);
				self.powerUp.showPowerUp(self.powerUp.lat,self.powerUp.lng)
			},5000)

		}
	},

	// setMapBoundaries: function() {

	// 	centreLat = this.view.lat;
	// 	centreLng = this.view.lng;
	// 	this.boundary = new Boundary([centreLat, centreLng])
	// 	this.boundary.setMapLimits();
	// 	farthestLat = 0.003882
	// 	farthestLng = 0.007397
	// 	this.biggestLat = centreLat + farthestLat
	// 	this.biggestLng = centreLng + farthestLng
	// 	this.smallestLat = centreLat - farthestLat
	// 	this.smallestLng = centreLng - farthestLng
	// },


	setUpRabbitLocationTimer: function(interval) {
		this.setUpRabbitLocationPusher();
		self.rabbitTimer = setInterval(this.sendRabbitPosition.bind(this), interval)
	},

	// Only sends message if player is 'rabbit'
	sendRabbitPosition: function(){
		if(this.player.options.kind == 'rabbit'){
			$.ajax({
			  type: "POST",
			  url: this.updateRabbitUrl,
			  data: this.player.options,
			});
		}
	},
	// sets up pusher channel
	setUpRabbitLocationPusher: function(){
		var self = this
		var gameId = this.player.options.game_id
		this.pusher = new Pusher('7a73ab83106664465bfd');
		this.channel = this.pusher.subscribe('game_'+ gameId);
		this.channel.bind('show_rabbit_street_view_game', function(data) {
			self.view.showStreetView(data.message)
		});
		this.channel.bind('win_message', function(data){
			self.view.showWinModal(data.message)
			self.unbindEvents();

		});
	},


};
