class Game < ActiveRecord::Base
  has_many :players

  def get_random_lat
    centre_lat + rand(-3882..3882)/1000000.0
  end

  def get_random_lng
    centre_lng + rand(-7397..7397)/1000000.0
  end

  def mark_as_rabbit?
    if players.count<1
      return "rabbit"
    else
      return "hunter"
    end
  end

  def finished!(current_game)
    self.active = false
  end

end
