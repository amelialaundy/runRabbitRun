class ProximityChecker

	WIN_ZONE_RADIUS_SQUARED = 0.0005 ** 2
	RED_ZONE_RADIUS_SQUARED = 0.002 ** 2
	YELLOW_ZONE_RADIUS_SQUARED = 0.005 ** 2


	attr_reader :hunter, :rabbit, :hunter_coordinate, :rabbit_coordinate, :win

	def initialize(players)
		@hunter = players.fetch(:hunter)
		@rabbit = players.fetch(:rabbit)
		@win = false
	end

	def distance_between_hunter_and_rabbit
		hunter_lat = hunter.coordinates.lat
		hunter_lng = hunter.coordinates.lng
		rabbit_lat = rabbit.coordinates.lat
		rabbit_lng = rabbit.coordinates.lng
		((hunter_lat - rabbit_lat)**2 + (hunter_lng - rabbit_lng)**2)
	end

	def zone
    if distance_between_hunter_and_rabbit < WIN_ZONE_RADIUS_SQUARED
    	@win = true
    	"win"
    elsif distance_between_hunter_and_rabbit < RED_ZONE_RADIUS_SQUARED
    	"red"
    elsif distance_between_hunter_and_rabbit < YELLOW_ZONE_RADIUS_SQUARED
    	"orange"
    else
    	"green"
    end
	end

end