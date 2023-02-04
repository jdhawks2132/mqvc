class CsvImportVendorsService
  require 'csv'

  def call(file)
    imported_file = File.open(file)
    csv = CSV.new(imported_file, headers: true, col_sep: ',')

    csv.each do |row|
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
      vendor_hash[:previous_participant] = (
        if row['previous_participant'].to_s.downcase == 'true'
          true
        else
          false
        end
      )

      unless vendor_hash.values.all? { |value| value.nil? || value.empty? }
        Vendor.create!(vendor_hash)
      end
    end
  end
end
