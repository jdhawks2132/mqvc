class AddStatusToVendorContribution < ActiveRecord::Migration[7.0]
  def change
    add_column :vendor_contributions, :status, :string
  end
end
