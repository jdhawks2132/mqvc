class AddStateToVendors < ActiveRecord::Migration[7.0]
  def change
    add_column :vendors, :state, :string
  end
end
