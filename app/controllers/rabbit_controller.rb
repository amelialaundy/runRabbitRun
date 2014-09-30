class RabbitController < ApplicationController

  def update_rabbit_street_view
    latlng = params["lat"]+','+params["lng"]
    pusher_rabbit_location
    render json: {latlng: latlng}
  end

private

  def pusher_rabbit_location
    Pusher['game_'+params["game_id"].to_s].trigger('show_rabbit_street_view_game', {
      :message => latlng
    })
  end
end
