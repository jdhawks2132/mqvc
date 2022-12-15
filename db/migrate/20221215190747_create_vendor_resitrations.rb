class CreateVendorResitrations < ActiveRecord::Migration[7.0]
  def change
    create_table :vendor_resitrations do |t|
      t.references :vendor, null: false, foreign_key: true
      t.references :registration, null: false, foreign_key: true
      t.date :year
      t.text :notes
      t.string :status

      t.timestamps
    end
  end
end
