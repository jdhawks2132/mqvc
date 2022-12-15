class RemoveUserIdFromRoles < ActiveRecord::Migration[7.0]
  def change
    remove_column :roles, :user_id, :bigint
    remove_column :roles, :vendor_id, :bigint
  end
end
