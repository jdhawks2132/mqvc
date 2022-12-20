class AddPrimaryToContact < ActiveRecord::Migration[7.0]
  def change
    add_column :contacts, :primary, :boolean
  end
end
