class FixModelSpelling < ActiveRecord::Migration[7.0]
  def change
    rename_table :vendor_resitrations, :vendor_registrations
  end
end
