DomManager = (function () {
    publik = {};

    publik.registerDivs = function () {
        publik.playerIdDiv = $('#player-id')
        publik.playerLatDiv = $('#player-lat');
        publik.playerLngDiv = $('#player-lng');
        publik.gameIdDiv = $('#player-info');
        publik.playerKindDiv = $('#player-kind')
    }

    
    publik.getDivContents = function () {
        return {
            plId: publik.playerIdDiv.data().plId,
            plLat: publik.playerLatDiv.data().plLat,
            plLng: publik.playerLngDiv.data().plLng,
            plGameId: publik.gameIdDiv.data().plGameId,
            kind: publik.playerKindDiv.data().kind
        }
    }

    return publik;
}());

function View() {
	this.lat = -41.295308
	this.lng = 174.773082
	this.zoom = 15
	this.googlePlayer = null

    this.divData = DomManager.getDivContents();

    this.playerIdDiv = this.divData.plId
    this.playerLatDiv = this.divData.plLat
    this.playerLngDiv = this.divData.plLng
    this.gameIdDiv = this.divData.plGameId
    this.playerKindDiv = this.divData.kind
}

View.prototype = {
	initializeMap: function() {
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
    	return googlePlayerMarker
    },

    createNewPlayerMarkerOptions: function(playerMarker) {
    	return {
    	  map: this.map,
    	  position: new google.maps.LatLng(playerMarker.lat, playerMarker.lng)
    	};
    },

    moveMarker: function(lat, lng) {
    	LatLng = {lat: lat, lng: lng}
    	this.googlePlayer.setPosition(LatLng);
    },

    showStreetView: function(latlng){
        var baseUri ="http://maps.googleapis.com/maps/api/streetview?size=400x400&location="
        $('#streetview').html('<img src='+baseUri+latlng+'>')
    }
}
