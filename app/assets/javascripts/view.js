function View() {

}

View.prototype = {
	initializeMap: function() {
      var mapOptions = {
        center: new google.maps.LatLng(this.lat, this.lng),
        zoom: this.zoom
      }
      this.map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
    }
}