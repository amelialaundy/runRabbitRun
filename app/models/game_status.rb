class GameStatus

  WIN_ZONE_RADIUS = 0.001
  RED_ZONE_RADIUS = 0.01

  def initialize(game)
    @game = game
  end

  def update(args)
    player = Player.find(args[:id])
    player.update_position({lat: args[:lat], lng: args[:lng]})
    return { proximity: "irrelevent"} if player.rabbit?
    rabbit = @game.find_rabbit
    proximity = ProximityChecker.new({hunter: player, rabbit: rabbit})
    @game.finished! if proximity.win
    return { proximity: proximity.zone }
	end    

end
