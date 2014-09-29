function GeocodeController() {
	this.view = new View();
	this.geocodeSearch  = new GeocodeSearch();
	this.newGameUrl = '/games/new'
	self = this
}

GeocodeController.prototype = {
	getGeocodeLocation: function(e) {
		console.log(self)
		e.preventDefault();
		var location = self.view.getAddress();
		self.geocodeSearch.search(location.address, self.setGeocodedLocationForNewGame)
		
	},

	setGeocodedLocationForNewGame: function(data) {
		console.log(data[0]['geometry']['location']['lat'])
		self.view.setMapLocation(data)
		$.ajax({
			type: "POST",
			url: self.newGameUrl,
			data: {data: data}
		});
	}
}