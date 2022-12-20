class Vendor < ApplicationRecord
  has_many :vendor_contacts, dependent: :destroy
  has_many :contacts, through: :vendor_contacts

  has_many :vendor_contributions, dependent: :destroy
  has_many :contributions, through: :vendor_contributions

  has_many :vendor_registrations, dependent: :destroy
  has_many :registrations, through: :vendor_registrations

  has_many :vendor_assignments, dependent: :destroy
  has_many :users, through: :vendor_assignments

  # vendor validations

  validates :name, presence: true, uniqueness: true
end
