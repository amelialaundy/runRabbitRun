class PlayersController < ApplicationController

	def update_player_position
    game_data = GameStatus.update(params)
		render json: {game_status: game_data}
	end

  def send_win_message
    winner_data = params
    Pusher['rabbit_location_game_'+params["game_id"].to_s].trigger('win_message',{
      :message => winner_data
    })
    render json: {winner_data: "Player #{winner_data} is the winner!"}
  end
end

