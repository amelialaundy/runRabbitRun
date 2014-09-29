function GeocodeSearch() {
	this.googleGeoSearchUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="
}


GeocodeSearch.prototype = {
  search: function(address, callback) {
    var api_key = "AIzaSyBPMwfjAD5SqjAV50RXw-pLNhl_9qVZXgQ"
    var sanitizedAddress = address.replace(/ /g, "%20")
    var url = this.googleGeoSearchUrl + sanitizedAddress+ "&key=" + api_key;
    var ajaxRequest = $.ajax({
      url: url,
      type: "GET",
      success: callback
    });
  }
}