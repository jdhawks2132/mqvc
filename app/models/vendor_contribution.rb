class VendorContribution < ApplicationRecord
  belongs_to :vendor
  belongs_to :contribution
  belongs_to :user
end
