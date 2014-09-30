class PlayersController < ApplicationController

	def update_player_position
    game_data = GameStatus.update(params)
		render json: {game_status: game_data}
	end

  def send_win_message
    winner_data = params["player_stats"]
    Pusher['game_'+winner_data["game_id"].to_s].trigger('win_message',{
      :message => "Player #{winner_data["id"]} is the winner!"
    })
    render json: {winner_data: "Player #{winner_data["id"]} is the winner!"}
  end
end

