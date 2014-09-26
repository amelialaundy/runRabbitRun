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

end
