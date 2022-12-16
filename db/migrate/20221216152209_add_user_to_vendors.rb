class AddUserToVendors < ActiveRecord::Migration[7.0]
  def change
    add_reference :vendors, :user, null: true, foreign_key: true
  end
end
