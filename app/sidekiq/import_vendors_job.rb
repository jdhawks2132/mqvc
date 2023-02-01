class ImportVendorsJob
  include Sidekiq::Job
  require 'csv'

  def perform(file_path)
    CSV.foreach(file_path, headers: true) do |row|
      vendor_hash = {}
      vendor_hash[:name] = row['name']
      vendor_hash[:vendor_type] = row['vendor_type']
      vendor_hash[:status] = row['status']
      vendor_hash[:website] = row['website']
      vendor_hash[:phone] = row['phone']
      vendor_hash[:general_email] = row['general_email']
      vendor_hash[:street_address] = row['street_address']
      vendor_hash[:city] = row['city']
      vendor_hash[:state] = row['state']
      vendor_hash[:zip] = row['zip']
      vendor_hash[:country] = row['country']
      vendor_hash[:notes] = row['notes']
      vendor_hash[:previous_participant] = row['previous_participant']

      # check to see if ALL the values are nil or empty if so break out of the loop
      break if vendor_hash.values.all? { |value| value.nil? || value.empty? }

      Vendor.create!(vendor_hash)
    end
  end
end
