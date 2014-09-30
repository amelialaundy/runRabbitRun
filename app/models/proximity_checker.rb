class ProximityChecker

	attr_reader :hunter, :rabbit
	WIN_ZONE_RADIUS = 0.0005
	RED_ZONE_RADIUS = 0.002
	YELLOW_RADIUS = 0.004
	def initialize(players)
		@hunter = players[:hunter]
		@rabbit = players[:rabbit]
	end


end