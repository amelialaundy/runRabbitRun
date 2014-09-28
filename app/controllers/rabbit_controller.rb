class RabbitController < ApplicationController

  def update_rabbit_street_view
    latlng = params["lat"]+','+params["lng"]
    Pusher['rabbit_location_game_'+params["game_id"].to_s].trigger('show_rabbit_street_view_game', {
      :message => latlng
    })
    render json: {latlng: latlng}
  end
end
