class PlayerController < ApplicationController
	def update_position
		puts params['id']
		render json: Player.all.first
	end
end