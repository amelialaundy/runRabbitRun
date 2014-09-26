class WelcomeController < ApplicationController
  def index
    @game = Game.new
  end

end