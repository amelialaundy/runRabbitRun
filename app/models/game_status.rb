class GameStatus

  WIN_ZONE_RADIUS = 0.001
  RED_ZONE_RADIUS = 0.01

  def initialize(game)
    @game = game
  end

  def update(args)

    player = Player.find(args[:id])
    player.update_position(lat: args[:lat], lng: args[:lng])
    return { proximity: "irrelevent"} if player.rabbit?
    rabbit = @game.find_rabbit
    proximity = ProximityChecker.new(hunter: player, rabbit: rabbit)
    @game.finished! if proximity.win_zone?
    # return proximity.data
    #
    # zone = proximity_to_rabbit?
    # @game.finished! if zone == "win_zone"
    # zone
	end    

# private

# 	def proximity_to_rabbit?
#     rabbit = @game.find_rabbit
#     params = {
#       centre_x: rabbit.position[:lat],
#       centre_y: rabbit.position[:lng],
#       player_x: @player.lat,
#       player_y: @player.lng
#     }
#     return which_zone?(params)
# 	end

#   def which_zone?(options)
#     if @player.hunter?
#       centre_x = options[:centre_x]
#       centre_y = options[:centre_y]
#       player_x = options[:player_x]
#       player_y = options[:player_y]
#       circle_area = ((player_x - centre_x)**2 + (player_y - centre_y)**2)
#       if circle_area < WIN_ZONE_RADIUS**2
#         @game.active = false
#         @game.save
#         return true
#       else
#         return false
#       end
#     else
#       return false
#     end
#   end

end
