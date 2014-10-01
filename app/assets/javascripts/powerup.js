var PowerUp = function(view){

  this.view = view;
  this.maxLat = 2882
  this.minLat = -2883
  this.maxLng = 6397
  this.minLng = -6397
  this.lat = (this.view.lat + ((Math.random() * (this.maxLat - this.minLat) + this.minLat))/1000000.0)
  this.lng = (this.view.lng + ((Math.random() * (this.maxLng - this.minLng) + this.minLat))/1000000.0)
}

PowerUp.prototype = {

  collectAbility: function(player){
    var radius = 0.0003;
    var circleArea = Math.pow((player.lat-this.lat),2)+ Math.pow((player.lng-this.lng),2) ;
    if(circleArea < Math.pow(radius,2) ){
      this.marker.setVisible(false)
      return true
    }
  },

  showPowerUp: function(lat,lng){
    var self = this;
    var icon = '/assets/mysterybox.png';
    this.marker = new google.maps.Marker({
      position: { lat: lat,
                  lng: lng},
      map: this.view.map,
      icon: icon,
      animation: google.maps.Animation.BOUNCE
    });
  }
}
