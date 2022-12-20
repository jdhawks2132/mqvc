class VendorAssignment < ApplicationRecord
  belongs_to :user
  belongs_to :vendor

  # verify that a user is not assigned to a vendor more than once
  validates :user_id, uniqueness: { scope: :vendor_id }
end
