class VendorContact < ApplicationRecord
  belongs_to :vendor
  belongs_to :contact
end
