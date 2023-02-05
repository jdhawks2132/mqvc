class SendMailersJob
  include Sidekiq::Job

  def perform(vendor_id, mailer_id)
    vendor = Vendor.find(vendor_id)
    mailer = Mailer.find(mailer_id)

    # check if vendor has a primary contact
    # if not, use general email

    primary_contact = nil

    has_primary_contact =
      vendor.contacts.where(primary: true).first != nil ? true : false

    if has_primary_contact
      primary_contact = vendor.contacts.where(primary: true).first.email
    else
      primary_contact = vendor.general_email
    end

    subject = mailer.subject
    body = mailer.body

    DefaultMailer.send_email(primary_contact, subject, body).deliver_now
    VendorMailer.create!(vendor: vendor, mailer: mailer)
  end
end
