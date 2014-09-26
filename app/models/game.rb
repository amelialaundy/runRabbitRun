class Game < ActiveRecord::Base
  attr_reader :centre_lat, :centre_lng
  has_many :players

  def get_random_lat
    centre_lat + ((rand(800)-400)/1000000.00)
  end

  def get_random_lng
    centre_lng + ((rand(800)-400)/1000000.00)
  end
end
