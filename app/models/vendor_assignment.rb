class VendorAssignment < ApplicationRecord
  belongs_to :user
  belongs_to :vendor
end
