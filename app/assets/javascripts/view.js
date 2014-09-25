function View() {
	this.lat = -41.295308
	this.lng = 174.773082
	this.zoom = 8

}

View.prototype = {
	initializeMap: function() {
		console.log("hey")
      var mapOptions = {
        center: new google.maps.LatLng(this.lat, this.lng),
        zoom: this.zoom
      }
      this.map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
    }
}