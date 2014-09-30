class Player < ActiveRecord::Base
  belongs_to :game

  RABBIT = 'rabbit'

  def update_position(position_hash)
    self.lat = position_hash[:lat]
    self.lng = position_hash[:lng]
    save
  end

	def rabbit?
  	self.kind == RABBIT
  end

end
