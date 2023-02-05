# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_02_05_002708) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "api_keys", force: :cascade do |t|
    t.string "key_name"
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contacts", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "street_address"
    t.string "city"
    t.string "state"
    t.string "zip_code"
    t.string "phone"
    t.string "title"
    t.string "organization"
    t.string "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "primary"
  end

  create_table "contributions", force: :cascade do |t|
    t.string "contribution_type"
    t.float "amount"
    t.string "name"
    t.string "dimensions"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "jwt_denylist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti"
  end

  create_table "mailers", force: :cascade do |t|
    t.string "subject"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "registrations", force: :cascade do |t|
    t.integer "badges"
    t.integer "tables"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "registration_type"
    t.float "registration_price"
  end

  create_table "roles", force: :cascade do |t|
    t.integer "level", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_roles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "role_id", null: false
    t.bigint "vendor_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role_id"], name: "index_user_roles_on_role_id"
    t.index ["user_id"], name: "index_user_roles_on_user_id"
    t.index ["vendor_id"], name: "index_user_roles_on_vendor_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "vendor_assignments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "vendor_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_vendor_assignments_on_user_id"
    t.index ["vendor_id"], name: "index_vendor_assignments_on_vendor_id"
  end

  create_table "vendor_contacts", force: :cascade do |t|
    t.bigint "vendor_id", null: false
    t.bigint "contact_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["contact_id"], name: "index_vendor_contacts_on_contact_id"
    t.index ["vendor_id"], name: "index_vendor_contacts_on_vendor_id"
  end

  create_table "vendor_contributions", force: :cascade do |t|
    t.bigint "vendor_id", null: false
    t.bigint "contribution_id", null: false
    t.string "year"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "status"
    t.string "asset_link"
    t.index ["contribution_id"], name: "index_vendor_contributions_on_contribution_id"
    t.index ["vendor_id"], name: "index_vendor_contributions_on_vendor_id"
  end

  create_table "vendor_mailers", force: :cascade do |t|
    t.bigint "vendor_id", null: false
    t.bigint "mailer_id", null: false
    t.bigint "vendor_contribution_id"
    t.bigint "vendor_registration_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["mailer_id"], name: "index_vendor_mailers_on_mailer_id"
    t.index ["vendor_contribution_id"], name: "index_vendor_mailers_on_vendor_contribution_id"
    t.index ["vendor_id"], name: "index_vendor_mailers_on_vendor_id"
    t.index ["vendor_registration_id"], name: "index_vendor_mailers_on_vendor_registration_id"
  end

  create_table "vendor_registrations", force: :cascade do |t|
    t.bigint "vendor_id", null: false
    t.bigint "registration_id", null: false
    t.date "year"
    t.text "notes"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "badge_names"
    t.index ["registration_id"], name: "index_vendor_registrations_on_registration_id"
    t.index ["vendor_id"], name: "index_vendor_registrations_on_vendor_id"
  end

  create_table "vendors", force: :cascade do |t|
    t.string "name"
    t.string "vendor_type"
    t.string "status"
    t.string "general_email"
    t.string "website"
    t.string "phone"
    t.string "street_address"
    t.string "city"
    t.string "zip"
    t.string "country"
    t.string "previous_participant"
    t.string "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "state"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "user_roles", "roles"
  add_foreign_key "user_roles", "users"
  add_foreign_key "user_roles", "vendors"
  add_foreign_key "vendor_assignments", "users"
  add_foreign_key "vendor_assignments", "vendors"
  add_foreign_key "vendor_contacts", "contacts"
  add_foreign_key "vendor_contacts", "vendors"
  add_foreign_key "vendor_contributions", "contributions"
  add_foreign_key "vendor_contributions", "vendors"
  add_foreign_key "vendor_mailers", "mailers"
  add_foreign_key "vendor_mailers", "vendor_contributions"
  add_foreign_key "vendor_mailers", "vendor_registrations"
  add_foreign_key "vendor_mailers", "vendors"
  add_foreign_key "vendor_registrations", "registrations"
  add_foreign_key "vendor_registrations", "vendors"
end
