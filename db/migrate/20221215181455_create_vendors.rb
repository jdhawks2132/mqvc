class CreateVendors < ActiveRecord::Migration[7.0]
  def change
    create_table :vendors do |t|
      t.string :name
      t.string :type
      t.string :status
      t.string :general_email
      t.string :website
      t.string :phone
      t.string :street_address
      t.string :city
      t.string :zip
      t.string :country
      t.string :previous_participant
      t.string :notes

      t.timestamps
    end
  end
end
