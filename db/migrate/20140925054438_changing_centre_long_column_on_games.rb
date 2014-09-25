class ChangingCentreLongColumnOnGames < ActiveRecord::Migration
  def change
  	rename_column :games, :centre_long, :centre_lng
  end
end
