class VendorExportJob
  require 'csv'
  include Sidekiq::Job

  def perform(user_id)
    # Retrieve the data you want to export
    data = Vendor.all

    # Create a new CSV file
    CSV.open(
      "storage/downloads/vendor_export-#{Date.today}-#{user_id}.csv",
      'w',
    ) do |csv|
      # Add the headers
      csv << data.column_names
      # add the data
      data.find_each do |vendor|
        csv << vendor.attributes.values_at(*data.column_names)
      end
    end
  end
end
