class GamesController < ApplicationController

  def new
  end

  def create
    # This should likely be in a strong params thing in it's own method
    game_params = params["game"]

    # Not terrible here but could also consider a factory class or method
    # Game.new_from_params(game_params)
    game = Game.new(centre_lat:game_params["centre_lat"],
                     centre_lng:game_params["centre_lng"],
                     num_players:game_params["num_players"],
                     active: true)
    # Handle case if save is unsuccessful for some reason. Flash message or something.
    game.save

    # Don't need to_s here if using string interpolation
    # "/games/#{game.id}"
    redirect_to ('/games/'+game.id.to_s)
  end

  def show
    @game = Game.find(params[:id])
    # See above re-factory type method. Not super important but reduces
    # noise here in the controller.
    @player = Player.create( game_id: params[:id],
                          lat: @game.get_random_lat,
                          lng: @game.get_random_lng,
                          kind: @game.mark_as_rabbit? )

  end

end

