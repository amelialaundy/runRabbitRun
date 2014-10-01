class Game < ActiveRecord::Base
  has_many :players


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
    if players.count<1
      return "rabbit"
    else
      return "hunter"
    end
  end

  def finished!
    self.active = false
  end

  def find_rabbit
    self.players.find_by(kind: "rabbit")
  end

end
