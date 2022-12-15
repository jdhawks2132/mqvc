class CreateVendorAssignments < ActiveRecord::Migration[7.0]
  def change
    create_table :vendor_assignments do |t|
      t.references :user, null: false, foreign_key: true
      t.references :vendor, null: false, foreign_key: true

      t.timestamps
    end
  end
end
