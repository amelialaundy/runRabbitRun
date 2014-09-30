class Coordinate

	attr_reader :lat, :lng

	def initialize(coordinates)
		@lat = coordinates.fetch(:lat)
		@lng = coordinates.fetch(:lng)
	end

end