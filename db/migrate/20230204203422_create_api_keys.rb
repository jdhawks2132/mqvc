class CreateApiKeys < ActiveRecord::Migration[7.0]
  def change
    create_table :api_keys do |t|
      t.string :key_name
      t.string :value

      t.timestamps
    end
  end
end
