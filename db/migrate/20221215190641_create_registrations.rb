class CreateRegistrations < ActiveRecord::Migration[7.0]
  def change
    create_table :registrations do |t|
      t.integer :badges
      t.integer :tables
      t.string :badge_names

      t.timestamps
    end
  end
end
