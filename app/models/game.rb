class Game < ActiveRecord::Base
  has_many :players

  RABBIT = "rabbit"
  HUNTER = "hunter"

  def get_random_lat
    max_lat = 3882
    centre_lat + rand(-max_lat..max_lat)/1000000.0
  end

  def get_random_lng
    max_lng = 7397
    centre_lng + rand(-max_lng..max_lng)/1000000.0
  end

  #Marks first player to join/make game as rabbit
  def mark_as_rabbit?
    players.count < 1 ? RABBIT : HUNTER
  end

  def finished!
    self.active = false
  end

  def find_rabbit
    self.players.rabbit
  end

end
