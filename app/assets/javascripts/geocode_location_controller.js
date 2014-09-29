function GeocodeController() {
	this.view = new View();
	this.geocodeSearch = new GeocodeSearch();
	this.createGameUrl = '/games'
	$(this.view.searchButton).on("click", this.getGeocodeLocation);
	self = this
}

GeocodeController.prototype = {
	getGeocodeLocation: function(e) {
		e.preventDefault();
		this.location = self.view.getAddress();
		self.geocodeSearch.search(this.location.address, self.setGeocodedLocationForNewGame)
		
	},

	setGeocodedLocationForNewGame: function(postData) {
		console.log(postData['results'][0])
		self.view.setMapLocation(postData['results']) 
		$.ajax({
			type: "POST",
			url: self.createGameUrl,
			data: {data: postData},
			success: self.redirectToNewGame
		});
	},

	redirectToNewGame: function(data) {
		window.location.replace("/games/"+data['game_id'])
	
	}
}