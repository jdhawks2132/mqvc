class UpdateDecimalsToFloats < ActiveRecord::Migration[7.0]
  def change
    change_column :contributions, :amount, :float
    change_column :registrations, :registration_price, :float
  end
end
