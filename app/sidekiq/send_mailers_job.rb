class SendMailersJob
  include Sidekiq::Job

  def perform(vendor_id, mailer_id)
    vendor = Vendor.find(vendor_id)
    mailer = Mailer.find(mailer_id)
    primary_contact =
      vendor.contacts.where(primary: true).first.email || vendor.general_email
    subject = mailer.subject
    body = mailer.body

    DefaultMailer.send_email(primary_contact, subject, body).deliver_now
  end
end
