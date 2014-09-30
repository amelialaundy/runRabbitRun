class ProximityChecker

	WIN_ZONE_RADIUS_SQUARED = 0.0005 ** 2
	RED_ZONE_RADIUS_SQUARED = 0.002 ** 2
	YELLOW_ZONE_RADIUS_SQUARED = 0.004 ** 2


	attr_reader :hunter, :rabbit, :hunter_coordinate, :rabbit_coordinate

	def initialize(players)
		@hunter = players.fetch(:hunter)
		@rabbit = players.fetch(:rabbit)
		@hunter_coordinate = Coordinate.new({ lat: hunter.lat, lng: hunter.lng })
		@rabbit_coordinate = Coordinate.new({ lat:rabbit.lat, lng: rabbit.lng })
		@win = false
	end

	def circle_area
		((hunter_coordinate.lat - rabbit_coordinate.lat)**2 + (hunter_coordinate.lng - rabbit_coordinate.lng)**2)
	end



	def zone
    if circle_area < WIN_ZONE_RADIUS
    	@win = true
    	"win"
    elsif circle_area < RED_ZONE_RADIUS
    	"red"
    elsif circle_area < YELLOW_ZONE_RADIUS
    	"yellow"
    else
    	"green"
    end
	end

end