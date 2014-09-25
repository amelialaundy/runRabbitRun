function View() {
	this.lat = -41.295308
	this.lng = 174.773082
	this.zoom = 15
	this.googlePlayer = null

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
    },

    renderMapPlayerMarkers: function(playerMarker) {
      var newMapMarker =  this.createMarker(playerMarker);
    },

    createMarker: function(playerMarker) {
    	var options = this.createNewPlayerMarkerOptions(playerMarker);
    	var googlePlayerMarker = new google.maps.Marker(options)
    	this.googlePlayer = googlePlayerMarker
    	console.log(googlePlayerMarker.position.k)
    	console.log(googlePlayerMarker.position.B)
    	return googlePlayerMarker
    },

    createNewPlayerMarkerOptions: function(playerMarker) {
    	return {
    	  map: this.map,
    	  position: new google.maps.LatLng(playerMarker.lat, playerMarker.lng),
    	  clickable: true,
    	  animation: google.maps.Animation.DROP,
    	};
    }
}