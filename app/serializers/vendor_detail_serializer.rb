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
             :primary_contact,
             :assigned_admin

  has_many :users
  has_many :vendor_assignments
  has_many :contacts
  has_many :contributions
  has_many :registrations
  has_many :vendor_mailers

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

  def assigned_admin
    #  iterate through the vendor_assignments the users that are admins or read_only_admins
    admin_assignment = {}
    object.vendor_assignments.each do |assignment|
      if assignment.user.admin? || assignment.user.read_only_admin?
        admin_assignment[:admin_id] = assignment.user.id
        admin_assignment[:vendor_assignment_id] = assignment.id
        admin_assignment[:user_name] = assignment.user.first_name + ' ' +
          assignment.user.last_name
      end
    end
    if admin_assignment[:admin_id] && admin_assignment[:vendor_assignment_id]
      admin_assignment
    else
      nil
    end
  end

  # include the with each vendor_mailer.name

  def vendor_mailers
    object.vendor_mailers.map do |vendor_mailer|
      {
        id: vendor_mailer.id,
        sent:
          vendor_mailer
            .created_at
            .in_time_zone('Central Time (US & Canada)')
            .strftime('%m/%d/%Y %l:%M %P'),
        subject: vendor_mailer.mailer.subject,
        mailer_id: vendor_mailer.mailer.id,
      }
    end
  end
end
