class AddRegistrationPriceToRegistration < ActiveRecord::Migration[7.0]
  def change
    add_column :registrations, :registration_price, :decimal
  end
end
