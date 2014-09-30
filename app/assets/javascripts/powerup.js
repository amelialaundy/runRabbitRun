var PowerUp = function(view){
  this.lat = -41.29398399999985;
  this.lng = 174.7716679999999;
  this.view = view;
}

PowerUp.prototype = {

  collectAbility: function(player){
    var radius = 0.0003;
    var circleArea = Math.pow((player.lat-this.lat),2)+ Math.pow((player.lng-this.lng),2) ;
    if(circleArea < Math.pow(radius,2) ){
      console.log("GotBox!")
      this.marker.setVisible(false)
    }
  },

  showPowerUp: function(lat,lng){
    var self = this;
    var icon = '/assets/box.png';
    this.marker = new google.maps.Marker({
      position: { lat: lat,
                  lng: lng},
      map: this.view.map,
      icon: icon
    });
  }
}
