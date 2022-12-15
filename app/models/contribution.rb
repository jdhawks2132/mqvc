class Contribution < ApplicationRecord
  has_one_attached :advertisement_asset

  has_many :vendor_contributions
  has_many :vendors, through: :vendor_contributions
end
