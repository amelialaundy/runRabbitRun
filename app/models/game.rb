class Game < ActiveRecord::Base
  has_many :players

  def get_random_lat
    # These should be constants! No hard coded number like this.
    centre_lat + rand(-7337..7337)/1000000.0
  end

  def get_random_lng
    # Reading through this I have no idea what this numbers represent
    centre_lng + rand(-12514..12514)/1000000.0
  end

  def mark_as_rabbit?
    # Ternary operator would read better here
    # Also, use constants not hard coded strings
    # players.count < MIN_PLAYER_COUNT ? RABBIT : HUNTER
    if players.count<1
      return "rabbit"
    else
      return "hunter"
    end
  end
end
