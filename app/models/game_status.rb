class GameStatus

	# def self.update(args)

 #        player_location(args)
 #        active?(args.fetch(:game_id))
	# end

  def initialize(game)
    @game = game
  end

  def update(args)
    puts "this is the args in game status update:#{args}"
    player = Player.find(args[:id])
    player.update_position({lat: args[:lat], lng: args[:lng]})
    return { proximity: "irrelevent"} if player.rabbit?
    rabbit = @game.find_rabbit
    proximity = ProximityChecker.new({hunter: player, rabbit: rabbit})

    @game.finished! if proximity.win
    p proximity.zone
    return { proximity: proximity.zone }
	end    

end
