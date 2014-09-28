DomManager = (function () {
    publik = {};

    publik.registerDivs = function () {
        publik.gameId = localStorage['game.id'];
        publik.playerId = localStorage['player.id']
        publik.playerLat = localStorage['player.lat'];
        publik.playerLng = localStorage['player.lng'];
        publik.playerKind = localStorage['player.kind']
    }

    
    publik.getDivContents = function () {
        return {
            plGameId: publik.gameId,
            plId: publik.playerId,
            plLat: publik.playerLat,
            plLng: publik.playerLng,
            kind: publik.playerKind
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

    this.playerId = this.divData.plId
    this.playerLat = this.divData.plLat
    this.playerLng = this.divData.plLng
    this.gameId = this.divData.plGameId
    this.playerKind = this.divData.kind
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
