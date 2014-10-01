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
    this.updateRabbitStreetViewUrl = '/rabbit/update_rabbit_street_view'
    this.sendWinMessageUrl = '/player/send_win_message'

    self = this
}

GameController.prototype = {
	start: function() {
		this.bindEvents();
		this.view.initializeMap();
		this.createPlayerMarkers();
		this.boundary = new Boundary([this.view.lat, this.view.lng], this.player);
		this.setUpRabbitLocationPusher();
		this.locationTimer = new Timer(1000, this.updatePlayerUrl, this.player, this.checkProximityToRabbit.bind(this)  )
		if (this.player.isRabbit) {
			this.rabbitTimer = new Timer(10000, this.updateRabbitStreetViewUrl, this.player)
		}
		this.powerUp.showPowerUp(this.powerUp.lat,this.powerUp.lng);
	},

	bindEvents: function() {
		$('body').on("keyup", this.movePlayerMarker);
	},
	unbindEvents: function() {
		$('body').off("keyup", this.movePlayerMarker)
	},

	checkProximityToRabbit: function(data) {
		if (data['proximity'] == "win") {
			clearInterval(this.locationTimer)
			this.sendWinMessageToAll()
		} else if (data['proximity'] == "red") {
				this.view.showProximityAlert("red")
		} else if (data['proximity'] == "orange") {
				this.view.showProximityAlert("orange")
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
			if (self.boundary.checkWithinLimits([0.00, moveDistance])) {
				self.player.move([0.0, moveDistance])
			}
		// 40 = down
		} else if (e.keyCode == 40) {
			if (self.boundary.checkWithinLimits([-moveDistance, 0.0 ])) {
				self.player.move([-moveDistance, 0.0])
			}
		// 37 = left
		} else if (e.keyCode == 37) {
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

	setUpRabbitLocationPusher: function(){
		var self = this
		var gameId = this.player.options.game_id
		var pusher = new Pusher('7a73ab83106664465bfd');
		var channel = pusher.subscribe('game_'+ gameId);
		channel.bind('show_rabbit_street_view_game', function(data) {
		self.view.showStreetView(data.message)
		});
		channel.bind('win_message', function(data){
		self.view.showWinModal(data.message)
		self.unbindEvents();

		});
	},
};
