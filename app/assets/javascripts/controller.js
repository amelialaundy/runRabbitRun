function Controller() {
	this.view = new View();
}

Controller.prototype = {
	start: function() {
		this.view.initializeMap();
	}


}