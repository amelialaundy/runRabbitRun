class RabbitController < ApplicationController

  def update_rabbit_street_view
    latlng = concat_coords(params["lat"],params["lng"])
    pusher_rabbit_location(latlng)
    render json: {latlng: latlng}
  end

private
  def concat_coords(lat,lng)
    params["lat"]+','+params["lng"]
  end

  def pusher_rabbit_location(latlng)
    Pusher['game_'+params["game_id"].to_s].trigger('show_rabbit_street_view_game', {
      :message => latlng
    })
  end
end
