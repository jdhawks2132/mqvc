class RemoveUserReferenceFromVendorContribution < ActiveRecord::Migration[7.0]
  def change
    remove_column :vendor_contributions, :user_id
  end
end
