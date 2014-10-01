class PlayersController < ApplicationController

	def update_player_position
    p "this is the update player position params:#{params}"
		game_status = GameStatus.new(Game.find(params[:game_id]))
    proximity_data = game_status.update(params)
		render json: proximity_data
	end

  def send_win_message
    winner_data = params["player_stats"]
    Pusher['game_'+winner_data["game_id"].to_s].trigger('win_message',{
      :message => "Player #{winner_data["id"]} is the winner!"
    })
    render json: {winner_data: "Player #{winner_data["id"]} is the winner!"}
  end
end

