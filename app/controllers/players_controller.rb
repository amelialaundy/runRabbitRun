class PlayersController < ApplicationController

	def update_player_position
    game_data = GameStatus.update(params)
		render json: {game_status: game_data}
	end
end

