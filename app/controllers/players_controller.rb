class PlayersController < ApplicationController

	def update_player_position
		game_status = GameStatus.new
    proximity_data = game_status.update(params)
		render json: {proximity: proximity_data}
	end
end

