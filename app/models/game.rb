class Game < ActiveRecord::Base
  
  has_many :players, :foreign_key => 'player_id'

end
