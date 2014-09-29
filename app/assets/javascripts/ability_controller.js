function AbilityController(view, playerController) {
	this.view = view
	this.playerController = playerController
	
}

AbilityController.prototype = {
	addSpeed: function(player) {
		console.log(this)
		document.removeEventListener("keyup", this.playerController.movePlayerMarker, false);
	}
}