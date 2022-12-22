class ContactDetailSerializer < ActiveModel::Serializer
  attributes :id,
             :first_name,
             :last_name,
             :email,
             :phone,
             :title,
             :organization,
             :street_address,
             :city,
             :state,
             :zip_code,
             :created_at,
             :updated_at,
             :primary

  has_many :vendors
end
