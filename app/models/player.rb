class Player < ActiveRecord::Base
  attr_accessor :lat, :long
  belongs_to :game


end
