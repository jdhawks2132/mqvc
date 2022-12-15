class FixTypeInContributions < ActiveRecord::Migration[7.0]
  def change
    rename_column :contributions, :type, :contribution_type
  end
end
