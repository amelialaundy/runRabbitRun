class ProximityChecker

	attr_reader :hunter, :rabbit

	def initialize(players)
		@hunter = players[:hunter]
		@rabbit = players[:rabbit]
	end

end