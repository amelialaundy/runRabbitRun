class Game < ActiveRecord::Base
  has_many :players

  def get_random_lat
    centre_lat + rand(-7337..7337)/1000000.0
  end

  def get_random_lng
    centre_lng + rand(-12514..12514)/1000000.0
  end

  def mark_as_rabbit?
    if players.count<1
      return "rabbit"
    else
      return "hunter"
    end
  end
end
