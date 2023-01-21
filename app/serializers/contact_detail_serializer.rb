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
             :primary,
             :primary_conversion

  has_many :vendors

  def primary_conversion
    # convert the postgresql boolean to a ruby boolean
    if object.primary == 't'
      true
    elsif object.primary == 'f'
      false
    else
      return object.primary
    end
  end
end
