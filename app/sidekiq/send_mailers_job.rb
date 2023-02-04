class SendMailersJob
  include Sidekiq::Job

  def perform(to, subject, body)
    TestMailer.test_email(to, subject, body).deliver_now
  end
end
