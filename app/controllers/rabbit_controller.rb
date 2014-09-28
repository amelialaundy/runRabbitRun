class RabbitController < ApplicationController

  def update_rabbit_street_view
    game_data = params
    Pusher['rabbit_location_game_'+game_data["game_id"].to_s].trigger('show_rabbit_street_view_game', {
      :message => [game_data["lat"], game_data["lng"]]
    })
    render json: {game_status: game_data}
  end
end
