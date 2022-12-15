class Vendor < ApplicationRecord
  has_many :vendor_contacts
  has_many :contacts, through: :vendor_contacts
end
