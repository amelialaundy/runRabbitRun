class Player < ActiveRecord::Base
  belongs_to :game

  def hunter?
  	self.kind == "hunter"
  end

end
