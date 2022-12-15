class CreateVendorContacts < ActiveRecord::Migration[7.0]
  def change
    create_table :vendor_contacts do |t|
      t.references :vendor, null: false, foreign_key: true
      t.references :contact, null: false, foreign_key: true

      t.timestamps
    end
  end
end
