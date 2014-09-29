function GeocodeSearch() {
	this.locationControllerUrl = "/location_search/new?address="
}


GeocodeSearch.prototype = {
  search: function(address, callback) {
    var addressForGoogleQuery = address.replace(/ /g, "+")
    var url = this.locationControllerUrl + addressForGoogleQuery;
     var ajaxRequest = $.ajax({
      url: url,
      type: "GET",
      success: callback
    });
  }
}