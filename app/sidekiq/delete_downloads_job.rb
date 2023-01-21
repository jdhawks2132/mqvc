class DeleteDownloadsJob
  include Sidekiq::Job

  def perform(*args)
    # Delete all files in the storage/downloads directory
    FileUtils.rm_rf(Dir.glob('storage/downloads/*'))
  end
end
