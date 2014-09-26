class PlayerController < ApplicationController

	def update_player_position
	  player = Player.find(params[id])
	  player.lat = player[lat]
	  player.lng = player[lng]
	  rabbit = Player.find_by kind: "rabbit"
	  render json: rabbit 
	end

end

