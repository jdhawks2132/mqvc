# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

VendorRegistration.destroy_all
VendorContribution.destroy_all
VendorContact.destroy_all
VendorAssignment.destroy_all
Contact.destroy_all
Vendor.destroy_all
Role.destroy_all

require 'csv'

puts 'Creating vendors...'

# use faker to create 10 vendors
10.times do |i|
  Vendor.create!(
    name: Faker::Company.name,
    vendor_type: Faker::Company.industry,
    website: Faker::Internet.url,
    phone: Faker::PhoneNumber.cell_phone,
    general_email: Faker::Internet.email,
    street_address: Faker::Address.street_address,
    city: Faker::Address.city,
    state: Faker::Address.state,
    zip: Faker::Address.zip_code,
    country: Faker::Address.country,
    notes: Faker::Lorem.paragraph,
    previous_participant: Faker::Boolean.boolean,
  )
end

puts 'Creating contacts...'

10.times do |i|
  Contact.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    street_address: Faker::Address.street_address,
    city: Faker::Address.city,
    state: Faker::Address.state,
    phone: Faker::PhoneNumber.cell_phone,
    title: Faker::Job.title,
    organization: Faker::Company.name,
    email: Faker::Internet.email,
  )
end

puts 'Creating contributions...'

Contribution.create!(
  contribution_type: 'Donation',
  amount: 100.00,
  name: 'Bronze Sponsorship',
  dimensions: nil,
)

Contribution.create!(
  contribution_type: 'Donation',
  amount: 500.00,
  name: 'Silver Sponsorship',
  dimensions: nil,
)

Contribution.create!(
  contribution_type: 'Donation',
  amount: 1000.00,
  name: 'Gold Sponsorship',
  dimensions: nil,
)

Contribution.create!(
  contribution_type: 'Advertisement',
  amount: 100.00,
  name: 'Banner Ad',
  dimensions: '300x250',
)

Contribution.create!(
  contribution_type: 'Advertisement',
  amount: 200.00,
  name: 'Half Page Ad',
  dimensions: '300x600',
)

Contribution.create!(
  contribution_type: 'Advertisement',
  amount: 300.00,
  name: 'Full Page Ad',
  dimensions: '600x600',
)

puts 'Creating registrations...'

Registration.create!(
  name: 'Basic',
  registration_price: 100.00,
  badges: 1,
  tables: 1,
  registration_type: 'Individual',
)

Registration.create!(
  name: 'Standard',
  registration_price: 200.00,
  badges: 2,
  tables: 1,
  registration_type: 'Individual',
)

Registration.create!(
  name: 'Premium',
  registration_price: 300.00,
  badges: 3,
  tables: 2,
  registration_type: 'Group',
)

Registration.create!(
  name: 'Corporate',
  registration_price: 400.00,
  badges: 4,
  tables: 2,
  registration_type: 'Corporate',
)

puts 'Creating vendor contacts...'

10.times do |i|
  VendorContact.create!(
    vendor_id: Vendor.all.sample.id,
    contact_id: Contact.all.sample.id,
  )
end

puts 'Creating vendor assignments...'

10.times do |i|
  VendorAssignment.create!(
    vendor_id: Vendor.all.sample.id,
    user_id: User.all.sample.id,
  )
end

puts 'Creating vendor contributions...'

10.times do |i|
  VendorContribution.create!(
    vendor_id: Vendor.all.sample.id,
    contribution_id: Contribution.all.sample.id,
  )
end

puts 'Creating vendor registrations...'

10.times do |i|
  VendorRegistration.create!(
    vendor_id: Vendor.all.sample.id,
    registration_id: Registration.all.sample.id,
  )
end

puts 'Creating roles...'

Role.create!(level: 0)

Role.create!(level: 1)

Role.create!(level: 2)

Role.create!(level: 3)

puts 'Done!'
