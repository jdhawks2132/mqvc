class VendorMailer < ApplicationRecord
  belongs_to :vendor
  belongs_to :mailer
  belongs_to :vendor_contribution, optional: true
  belongs_to :vendor_registration, optional: true
end
