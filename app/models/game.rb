class Game < ActiveRecord::Base
  has_many :players

  def get_random_lat
    centre_lat + ((rand(800)-400)/1000000.00)
  end

  def get_random_lng
    centre_lng + ((rand(800)-400)/1000000.00)
  end

  def mark_as_rabbit?
    if players.count<1
      return "rabbit"
    else
      return "hunter"
    end
  end
end
