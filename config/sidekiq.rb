require 'sidekiq-scheduler'

Sidekiq.configure_server do |config|
  config.on(:startup) do
    # Schedule the worker to run every hour
    Sidekiq::Scheduler.schedule(class: 'DeleteDownloadsJob', every: '1h')
  end
end
