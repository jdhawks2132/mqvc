class Registration < ApplicationRecord

  has_many :vendor_registrations, dependent: :destroy
  has_many :vendors, through: :vendor_registrations
end
