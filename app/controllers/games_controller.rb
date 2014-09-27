class GamesController < ApplicationController

  def new
  end

  def create
    game_params = params["game"]
    game = Game.new(centre_lat:game_params["centre_lat"],
                     centre_lng:game_params["centre_lng"],
                     num_players:game_params["num_players"])
    game.save
    redirect_to ('/games/'+game.id.to_s)
  end

  def show
    @game = Game.find(params[:id])
    @player = Player.create( game_id: params[:id],
                          lat: @game.get_random_lat,
                          lng: @game.get_random_lng,
                          kind: @game.mark_as_rabbit? )
    # render :json =>  @player
  end

  def active_games
    @games = Game.where("active = ?", "true")
    # render :json => @games
  end

end
