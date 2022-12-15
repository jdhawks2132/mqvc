class FixTypeColumnName < ActiveRecord::Migration[7.0]
  def change
    rename_column :vendors, :type, :vendor_type
  end
end
