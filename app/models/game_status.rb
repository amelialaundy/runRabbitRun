class GameStatus

  def update(args)
    update_player_location(args)
    @game = Game.find(args.fetch(:game_id))
    zone = proximity_to_rabbit?
    @game.finished! if zone == "win_zone"
    zone
	end    

private

	def update_player_location(args)
    @player = Player.find(args.fetch(:id))
    @player.lat = args.fetch(:lat)
    @player.lng = args.fetch(:lng)
    @player.save
	end

	def proximity_to_rabbit?(game_id)
    rabbit = @game.players.find_by(kind: "rabbit")
    params = {
      centre_x: rabbit.lat,
      centre_y: rabbit.lng,
      player_x: @player.lat,
      player_y: @player.lng
    }
    return which_zone?(params)
	end

  def which_zone?(options)
    if @player.kind == "hunter"
      centre_x = options[:centre_x]
      centre_y = options[:centre_y]
      player_x = options[:player_x]
      player_y = options[:player_y]
      radius = 0.001
      circle_area = ((player_x - centre_x)**2 + (player_y - centre_y)**2)
      if circle_area < radius**2
        @game.active = false
        @game.save
        return true
      else
        return false
      end
    else
      return false
    end
  end

end
