class GameStatus

	def self.update(args)
        player_location(args)
        active?(args.fetch(:game_id))
	end    

private

	def self.player_location(args)
        @player = Player.find(args.fetch(:id))
        @player.lat = args.fetch(:lat)
        @player.lng = args.fetch(:lng)
        @player.save
	end

	def self.active?(game_id)
        @game = Game.find(game_id)
        rabbit = @game.players.find_by(kind: "rabbit")
        params = {
            centre_x: rabbit.lat,
            centre_y: rabbit.lng,
            player_x: @player.lat,
            player_y: @player.lng
        }
        return in_circle?(params)
	end

    def self.in_circle?(options)
        if @player.kind == "hunter"
            centre_x = options[:centre_x]
            centre_y = options[:centre_y]
            player_x = options[:player_x]
            player_y = options[:player_y]
            radius = 0.0002
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
