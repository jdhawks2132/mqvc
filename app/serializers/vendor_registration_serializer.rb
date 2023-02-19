class VendorRegistrationSerializer < ActiveModel::Serializer
  attributes :id,
             :vendor_id,
             :registration_id,
             :created_at,
             :updated_at,
             :year,
             :notes,
             :status

  has_one :vendor
  has_one :registration
end
