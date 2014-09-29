class PlayersController < ApplicationController

	def update_player_position
    game_data = GameStatus.update(params)
		render json: {proximity: game_data}
	end
end

