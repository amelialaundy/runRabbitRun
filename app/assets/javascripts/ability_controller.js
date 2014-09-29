function AbilityController(view, playerController) {
	this.view = view
	this.playerController = playerController
	
}

AbilityController.prototype = {
	addSpeed: function(player) {
		document.removeEventListener("keyup", this.playerController.movePlayerMarker.bind(this), false);
	}
}