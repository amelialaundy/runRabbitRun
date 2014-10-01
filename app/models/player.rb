class Player < ActiveRecord::Base
  belongs_to :game

  RABBIT = 'rabbit'

  def update_position(position_hash)
    p "before: #{self.lat}, #{self.lng}"
    p "this is the positions received:#{position_hash[:lat]}"
    self.lat = position_hash[:lat]
    self.lng = position_hash[:lng]
    save
    p "after: #{self.lat}, #{self.lng}"
  end

	def rabbit?
  	self.kind == RABBIT
  end

end
