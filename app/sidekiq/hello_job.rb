class HelloJob
  include Sidekiq::Job

  def perform(*args)
    vendors = Vendor.all

    vendors.each { |vendor| puts vendor.name }
  end
end
