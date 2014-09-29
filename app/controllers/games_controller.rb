class GamesController < ApplicationController

  def new
  end

  def create
    game_params = GamesController.get_params(params)
    game = Game.new(centre_lat:game_params[:lat],
                     centre_lng:game_params[:lng],
                     num_players: 1,
                     active: true)
    game.save
    render json: {game_id: game.id}
  end

  def show
    @game = Game.find(params[:id])
    @player = Player.create( game_id: params[:id],
                          lat: @game.get_random_lat,
                          lng: @game.get_random_lng,
                          kind: @game.mark_as_rabbit? )
  end

  def self.get_params(params)
    return {
      lat: params['data']['results']['0']['geometry']['location']['lat'],
      lng: params['data']['results']['0']['geometry']['location']['lng']
    }
  end

end

