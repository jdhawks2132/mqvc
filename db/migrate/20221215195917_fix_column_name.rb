class FixColumnName < ActiveRecord::Migration[7.0]
  def change
    rename_column :roles, :role, :level
  end
end
