function AbilityController(view, playerController) {
	this.view = view
	this.playerController = playerController

}

AbilityController.prototype = {
	addSpeed: function() {
		this.view.bodyElement.off("keyup");
		this.view.bodyElement.on("keydown", this.playerController.movePlayerMarker)
	},
  normalSpeed: function(){
    this.view.bodyElement.off("keydown");
    this.view.bodyElement.on("keyup", this.playerController.movePlayerMarker);
  }
}
