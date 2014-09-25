class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :centre_lat
      t.integer :centre_long
      t.integer :num_players
      t.boolean :active

      t.timestamps
    end
  end
end
