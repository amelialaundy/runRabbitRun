class PlayersController < ApplicationController

	def update_player_position
    proximity_data = GameStatus.update(params)
		render json: {proximity: proximity_data}
	end
end

