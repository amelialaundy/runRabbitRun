function AbilityController(view, gameController) {
	this.view = view
	this.gameController = gameController

}

AbilityController.prototype = {
	addSpeed: function() {
		this.view.bodyElement.off("keyup");
		this.view.bodyElement.on("keydown", this.gameController.movePlayerMarker)
	},
  normalSpeed: function(){
    this.view.bodyElement.off("keydown");
    this.view.bodyElement.on("keyup", this.gameController.movePlayerMarker);
  }
}
 
