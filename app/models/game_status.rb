class GameStatus

	def initialize(game)
    @game = game
  end

  def update(args)
    player = Player.find(args[:id])
    player.update_position({lat: args[:lat], lng: args[:lng]})
    return { proximity: "irrelevent"} if player.rabbit?
    rabbit = @game.find_rabbit
    proximity = ProximityChecker.new({hunter: player, rabbit: rabbit})
    @game.finished! if proximity.win?
    return { proximity: proximity.zone }
  end    

end
