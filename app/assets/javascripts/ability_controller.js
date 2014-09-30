function AbilityController(view, playerController) {
	this.view = view
	this.playerController = playerController
	
}

AbilityController.prototype = {
	addSpeed: function(player) {
		this.view.bodyElement.off("keyup");
		this.view.bodyElement.on("keydown", this.playerController.movePlayerMarker)
	}
}