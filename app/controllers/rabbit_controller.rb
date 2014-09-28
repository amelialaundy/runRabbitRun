class RabbitController < ApplicationController

  def update_rabbit_street_view
    game_data = params
    latlng = game_data["lat"]+','+game_data["lng"]

    Pusher['rabbit_location_game_'+game_data["game_id"].to_s].trigger('show_rabbit_street_view_game', {
      :message => latlng
    })
    render json: {game_status: game_data}
  end
end
