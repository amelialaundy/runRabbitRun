class GamesController < ApplicationController

  def new
  end

  def create(centre_lat, centre_lng, num_players)
    @game = game.new(centre_lat, centre_lng, num_players)
    @game.save
  end
end
