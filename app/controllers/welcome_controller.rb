class WelcomeController < ApplicationController
	def index
    @games = Game.where("active = ?", "true")
	end
end
