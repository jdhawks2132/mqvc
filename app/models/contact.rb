class Contact < ApplicationRecord
  has_many :vendor_contacts, dependent: :destroy
  has_many :vendors, through: :vendor_contacts
end
