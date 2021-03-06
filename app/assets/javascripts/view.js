DomManager = (function () {
    publik = {};

    publik.registerDivs = function () {
        publik.gameId = localStorage['game.id'];
        publik.playerId = localStorage['player.id']
        publik.playerLat = localStorage['player.lat'];
        publik.playerLng = localStorage['player.lng'];
        publik.playerKind = localStorage['player.kind'];
        publik.gameLat = localStorage['game.lat'];
        publik.gameLng = localStorage['game.lng'];
    }


    publik.getDivContents = function () {
        return {
            plGameId: publik.gameId,
            plId: publik.playerId,
            plLat: publik.playerLat,
            plLng: publik.playerLng,
            kind: publik.playerKind,
            gameLat: publik.gameLat,
            gameLng: publik.gameLng
        }
    }

    return publik;
}());






function View() {
  this.divData = DomManager.getDivContents();
	this.lat = parseFloat(this.divData.gameLat);
	this.lng = parseFloat(this.divData.gameLng);
  this.bodyElement = $('body')
  this.searchButton = document.querySelector(".newGameButton")
	this.zoom = 16
	this.googlePlayer = null
  this.proximityAlert = $("#proximity-alert")
  this.playerId = this.divData.plId
  this.playerLat = parseFloat(this.divData.plLat)
  this.playerLng = parseFloat(this.divData.plLng)
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
        streetViewControl: false,
        disableDefaultUI: true
      }
      this.map = new google.maps.Map(document.getElementById("map-canvas"),
        mapOptions);
    },

    renderMapPlayerMarkers: function(playerMarker) {
      var newMapMarker =  this.createMarker(playerMarker);
    },

    getAddress: function() {
      this.address = $('#address-search-bar').val();
      return {
        address: this.address
      };
    },

    setMapLocation: function(data) {
      this.lat = data[0]['geometry']['location']['lat']
      this.lng = data[0]['geometry']['location']['lng']
    },

    createMarker: function(playerMarker) {
    	var options = this.createNewPlayerMarkerOptions(playerMarker);
    	var googlePlayerMarker = new google.maps.Marker(options)
    	this.googlePlayer = googlePlayerMarker
    	return googlePlayerMarker
    },

    createNewPlayerMarkerOptions: function(playerMarker) {
        if (playerMarker.options.kind =="rabbit"){
            var iconPic = "/assets/rabbit.png"
        }
        else{
            var iconPic = "/assets/terminator.gif"
        };
    	return {
    	  map: this.map,
    	  position: new google.maps.LatLng(playerMarker.currentLat, playerMarker.currentLng),
        icon: iconPic
    	};
    },

    moveMarker: function(lat, lng) {
    	LatLng = {lat: lat, lng: lng}
    	this.googlePlayer.setPosition(LatLng);
    },

    showStreetView: function(latlng){
        var baseUri ="http://maps.googleapis.com/maps/api/streetview?size=250x250&location="
        $('#streetview').html('<img class="streetview" src='+baseUri+latlng+'>')
    },

    showProximityAlert: function(message) {
      this.proximityAlert.css("background-color", message)
    },

    showWinModal: function(message) {
        $("#dialog h3.winMessage").html(message)
        $("#dialog").dialog({
            width: 735,
            autoOpen: true,
            modal: true,
            closeOnEscape: true,
            draggable: false
        });
    }
}
