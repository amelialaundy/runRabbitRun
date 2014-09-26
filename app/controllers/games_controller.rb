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
  end

  def active_games
    @games = Game.all
    p @games
    render :json => @games
  end

end
