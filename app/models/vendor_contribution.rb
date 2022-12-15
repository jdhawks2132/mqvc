class VendorContribution < ApplicationRecord
  belongs_to :vendor
  belongs_to :contribution
end
