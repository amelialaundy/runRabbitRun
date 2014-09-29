function GeocodeController() {
	this.view = new View();
	this.geocodeSearch  = new GeocodeSearch();
	this.createGameUrl = '/games'
	$(this.view.searchButton).on("click", this.getGeocodeLocation);
	self = this
}

GeocodeController.prototype = {
	getGeocodeLocation: function(e) {
		e.preventDefault();
		var location = self.view.getAddress();
		self.geocodeSearch.search(location.address, self.setGeocodedLocationForNewGame)
		
	},

	setGeocodedLocationForNewGame: function(postData) {
		self.view.setMapLocation(postData)
		$.ajax({
			type: "POST",
			url: self.createGameUrl,
			data: {data: postData},
			success: self.printData
		});
	},

	printData: function(data) {
		window.location.replace("/games/"+data['game_id'])
	
	}
}