class CreateVendorContributions < ActiveRecord::Migration[7.0]
  def change
    create_table :vendor_contributions do |t|
      t.references :vendor, null: false, foreign_key: true
      t.references :contribution, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :year
      t.text :notes

      t.timestamps
    end
  end
end
