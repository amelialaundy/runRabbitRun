class PlayerController < ApplicationController
	def update_position
		render json: Player.all.first
	end
end
