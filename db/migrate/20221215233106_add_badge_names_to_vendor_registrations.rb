class AddBadgeNamesToVendorRegistrations < ActiveRecord::Migration[7.0]
  def change
    add_column :vendor_registrations, :badge_names, :text
  end
end
