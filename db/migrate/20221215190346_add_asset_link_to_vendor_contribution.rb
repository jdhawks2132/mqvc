class AddAssetLinkToVendorContribution < ActiveRecord::Migration[7.0]
  def change
    add_column :vendor_contributions, :asset_link, :string
  end
end
