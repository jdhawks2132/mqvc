class RemoveBadgeNamesFromRegistration < ActiveRecord::Migration[7.0]
  def change
    remove_column :registrations, :badge_names
  end
end
