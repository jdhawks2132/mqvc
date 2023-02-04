class VendorSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :general_email,
             :status,
             :phone,
             :previous_participant,
             :notes,
             :vendor_type,
             :primary_contact

  has_many :users
  has_many :vendor_assignments

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
