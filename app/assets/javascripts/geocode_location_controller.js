function GeocodeController() {
	this.view = new View();
	this.geocodeSearch  = new GeocodeSearch();
	this.newGameUrl = '/games/create'
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
			url: self.newGameUrl,
			data: {data: postData},
			success: this.printData
		});
	},

	printData: function(data) {
		console.log("data function")
		console.log(data)
	}
}