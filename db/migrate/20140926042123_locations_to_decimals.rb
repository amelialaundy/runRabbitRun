class LocationsToDecimals < ActiveRecord::Migration
  def change
  	change_column :games, :centre_lat, :decimal, precision: 9, scale: 6
  	change_column :games, :centre_lng, :decimal, precision: 9, scale: 6

  	change_column :players, :lat, :decimal, precision: 9, scale: 6
  	change_column :players, :lng, :decimal, precision: 9, scale: 6		
  end
end
