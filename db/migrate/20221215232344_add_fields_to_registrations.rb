class AddFieldsToRegistrations < ActiveRecord::Migration[7.0]
  def change
    add_column :registrations, :name, :string
    add_column :registrations, :registration_type, :string
  end
end
