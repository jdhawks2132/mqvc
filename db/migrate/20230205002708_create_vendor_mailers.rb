class CreateVendorMailers < ActiveRecord::Migration[7.0]
  def change
    create_table :vendor_mailers do |t|
      t.references :vendor, null: false, foreign_key: true
      t.references :mailer, null: false, foreign_key: true
      t.references :vendor_contribution, null: true, foreign_key: true
      t.references :vendor_registration, null: true, foreign_key: true
      t.timestamps
    end
  end
end
