class CreateContributions < ActiveRecord::Migration[7.0]
  def change
    create_table :contributions do |t|
      t.string :type
      t.decimal :amount
      t.string :name
      t.string :dimensions

      t.timestamps
    end
  end
end
