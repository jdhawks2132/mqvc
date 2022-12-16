class RemoveUserToVendors < ActiveRecord::Migration[7.0]
  def change
    remove_column :vendors, :user_id, :bigint
  end
end
