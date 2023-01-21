class VendorDetailSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :general_email,
             :status,
             :website,
             :phone,
             :street_address,
             :city,
             :state,
             :zip,
             :country,
             :previous_participant,
             :previous_participant_conversion,
             :notes,
             :vendor_type,
             :latest_contribution,
             :latest_registration,
             :primary_contact

  has_many :users
  has_many :contacts
  has_many :contributions
  has_many :registrations

  def previous_participant_conversion
    # convert the postgresql boolean to a ruby boolean
    if object.previous_participant == 't'
      true
    elsif object.previous_participant == 'f'
      false
    else
      return object.previous_participant
    end
  end

  def latest_contribution
    if object.vendor_contributions.order('year DESC').first
      object.vendor_contributions.order('year DESC').first.year
    else
      nil
    end
  end

  def latest_registration
    if object.vendor_registrations.order('year DESC').first
      object.vendor_registrations.order('year DESC').first.year
    else
      nil
    end
  end

  def primary_contact
    # where contact.primary = true OR the first contact OR nil
    if object.contacts.where(primary: true).first
      object.contacts.where(primary: true).first
    elsif object.contacts.first
      object.contacts.first
    else
      nil
    end
  end
end
