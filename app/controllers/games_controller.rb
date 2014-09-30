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

private

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

end

