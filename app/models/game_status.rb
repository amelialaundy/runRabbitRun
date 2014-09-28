class GameStatus
  # Mixed hard and soft tabs in this file. Try fix as you go.
  # Suggest everyone is on 2-spaces for tabs.

	def self.update(args)
        player_location(args)
        # a check should not modify the game use the result to modify the game state as
        # this is the method that says it is responsible for "update"ing.
        # @game.finished! unless active?(...)
        active?(args.fetch(:game_id))
	end

# It is hard (and you shouldn't) test private methods. So, when
# when you have a lot of logic in private methods consider what
# other object might be hiding in here. Can be a module that you
# include in this class or maybe a PORO.
private

# I don't think this method name is desribing what the method is doing
# it is more like `update_player_location`
	def self.player_location(args)
        # Instance variables in a class method? What's going on here?
        @player = Player.find(args.fetch(:id))
        # consider an `.update` instead
        @player.lat = args.fetch(:lat)
        @player.lng = args.fetch(:lng)
        @player.save
	end

	def self.active?(game_id)
        @game = Game.find(game_id)
        # AR scope here. `@game.players.rabbits` or if you want
        # only one then write a method in game `@game.rabbit`
        rabbit = @game.players.find_by(kind: "rabbit")
        # You likely have some `Point` POROs here or in the very least grouping them as 2d arrays or hashes
        # Imagine your `Player` class had a method that returned `Point` objects
        # def position
        #   Point.new(lat, lng)
        # end
        # Then your circle method below could just accept a hunter and rabbit
        # pc = ProximityCalculator.new(rabbit, hunter)
        # pc.in_circle?
        params = {
            centre_x: rabbit.lat,
            centre_y: rabbit.lng,
            player_x: @player.lat,
            player_y: @player.lng
        }
        return in_circle?(params)
	end

    # This method is it's own class I think. ProximityCalculator or something like that.
    def self.in_circle?(options)
        # Knowing what is stored in Player's `kind` is not GameStatus's responsibility.
        # instead have method `@player.hunter?`
        if @player.kind == "hunter"
            centre_x = options[:centre_x]
            centre_y = options[:centre_y]
            player_x = options[:player_x]
            player_y = options[:player_y]
            radius = 0.0002 # Constant!
            # This is a method of it's own.
            circle_area = ((player_x - centre_x)**2 + (player_y - centre_y)**2)
            if circle_area < radius**2 # this is another method
                @game.active = false
                # This is a dagerous side affect. When I call to check `is_circle?` I would not expect
                # to have it update the game. This should be something that is done outside the method.
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
