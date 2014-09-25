function View() {
	this.lat = -41.295308
	this.lng = 174.773082
	this.zoom = 15

}

View.prototype = {
	initializeMap: function() {
		console.log("hey")
      var mapOptions = {
        center: new google.maps.LatLng(this.lat, this.lng),
        zoom: this.zoom,
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        streetViewControl: false
      }
      this.map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
    }
}