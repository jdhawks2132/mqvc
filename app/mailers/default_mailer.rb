class DefaultMailer < ApplicationMailer
  default from: 'hawks.dev.test@gmail.com'

  def send_email(to, subject, body)
    @body = body
    mail(to: to, subject: subject, content_type: 'text/html')
  end
end
