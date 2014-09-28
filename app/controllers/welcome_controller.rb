class WelcomeController < ApplicationController
	def index
    # Consider using an AR scope here instead of having this in the controller.
    # Something like Game.active
    @games = Game.where("active = ?", "true")
	end
end
