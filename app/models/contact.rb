class Contact < ApplicationRecord
  has_many :vendor_contacts
  has_many :vendors, through: :vendor_contacts
end
