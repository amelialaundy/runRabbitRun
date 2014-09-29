function GeocodeSearch() {
	this.locationControllerUrl = "/location_search/new?address="
}


GeocodeSearch.prototype = {
  search: function(address, callback) {
    var sanitizedAddress = address.replace(/ /g, "+")
    var url = this.locationControllerUrl + sanitizedAddress;
    var ajaxRequest = $.ajax({
      url: url,
      type: "GET",
      success: callback
    });
  }
}