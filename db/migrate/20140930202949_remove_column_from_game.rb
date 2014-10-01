class RemoveColumnFromGame < ActiveRecord::Migration
  def change
    remove_column :games, :num_players
  end
end
