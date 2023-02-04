class TestMailer < ApplicationMailer
  default from: 'hawks.dev.test@gmail.com'

  def test_email(to, subject, body)
    @body = body
    mail(to: to, subject: subject)
  end
end
