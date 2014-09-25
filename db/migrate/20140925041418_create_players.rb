class CreatePlayers < ActiveRecord::Migration
  def change
    create_table :players do |t|
      t.string :kind
      t.integer :lat
      t.integer :lng

      t.timestamps
    end
  end
end
