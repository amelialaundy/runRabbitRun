function GeocodeController() {
	this.view = new View();
	this.geocodeSearch  = new GeocodeSearch();
	this.createGameUrl = '/games'
	self = this
}

GeocodeController.prototype = {
	getGeocodeLocation: function(e) {
		console.log(self)
		e.preventDefault();
		var location = self.view.getAddress();
		self.geocodeSearch.search(location.address, self.setGeocodedLocationForNewGame)
		
	},

	setGeocodedLocationForNewGame: function(postData) {
		console.log(postData[0]['geometry']['location']['lat'])
		self.view.setMapLocation(postData)
		$.ajax({
			type: "POST",
			url: self.createGameUrl,
			data: {data: postData},
			success: self.printData
		});
	},

	printData: function(data) {
			console.log(data['game_id'])
		window.location.replace("/games/"+data['game_id'])
		console.log("data function")
	
	}
}