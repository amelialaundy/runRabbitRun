class GameStatus

	def self.update(args)
        player_location(args)
        active?(args.fetch(:game_id))
	end

private

	def self.player_location(args)
        player = Player.find(args.fetch(:id))
        player.lat = args.fetch(:lat)
        player.lng = args.fetch(:lng)
        player.save
	end

	def self.active?(game_id)
        game = Game.find(game_id)
        return game.active
    # evaluates whether the game has been won or not
	end

    def in_circle?(options)
        centre_x = options.centre_x
        centre_y = options.centre_y
        player_x = options.x
        player_y = options.y
        radius = 0.00008
        if ((player_x - centre_x)**2 + (player_y - centre_y)**2) < radius**2
            return true
        else
            return false
        end
    end

end
