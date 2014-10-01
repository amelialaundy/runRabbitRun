class GamesController < ApplicationController

  def new
  end

  def create
    game_params = get_params(params)
    game = Game.create(centre_lat:game_params[:lat],
                     centre_lng:game_params[:lng],
                     active: true)
    render json: {game_id: game.id}
  end

  def show
    @game = Game.find(params[:id])
    @player = Player.create(game_details(@game))
  end

  def update_game_status
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

  def get_params(params)
    {
      lat: params['data']['results']['0']['geometry']['location']['lat'],
      lng: params['data']['results']['0']['geometry']['location']['lng']
    }
  end

  def game_details(game)
    {
      game_id: @game.id,
      lat: @game.get_random_lat,
      lng: @game.get_random_lng,
      kind: @game.mark_as_rabbit?
    }
  end

  def pusher_win(winner_data)
    Pusher['game_'+ winner_data["game_id"].to_s].trigger('win_message',{
      :message => "Player #{winner_data["id"]} is the winner!"
    })
  end

end

