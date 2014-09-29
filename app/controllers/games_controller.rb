class GamesController < ApplicationController

  def new
  end

  def create
    game = Game.new(centre_lat:params['data']['0']['geometry']['location']['lat'],
                     centre_lng:params['data']['0']['geometry']['location']['lng'],
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

end

