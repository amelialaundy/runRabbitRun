class PlayersController < ApplicationController

	def update_player_position
    game = Game.find(params[:game_id])
		game_status = GameStatus.new(game)
    proximity_data = game_status.update(params)
		render json: proximity_data
	end

  def send_win_message
    winner_data = params["player_stats"]
    pusher_win(winner_data)
    render json: {winner_data: "Player #{winner_data["id"]} is the winner!"}
  end

private

  def pusher_win(winner_data)
    Pusher['game_'+ winner_data["game_id"].to_s].trigger('win_message',{
      :message => "Player #{winner_data["id"]} is the winner!"
    })
  end
end

