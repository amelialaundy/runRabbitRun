class PlayersController < ApplicationController

	def update_player_position
    	game_data = GameStatus.update(params)
		render json: {game_status: game_data}
	end

  def update_rabbit_position
    game_data = params
    Pusher['rabbit_location_game_'+game_data["game_id"].to_s].trigger('show_rabbit_street_view_game', {
      :message => "pusher is working!"
    })
    render json: {game_status: game_data}

  end

end

