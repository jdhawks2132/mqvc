class CreateRoles < ActiveRecord::Migration[7.0]
  def change
    create_table :roles do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :role, default: 0
      t.references :vendor, true: false, foreign_key: true

      t.timestamps
    end
  end
end
