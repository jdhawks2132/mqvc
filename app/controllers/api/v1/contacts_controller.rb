class Api::V1::ContactsController < ApiController
  before_action :set_contact, only: %i[show update destroy]
  def index
    @contacts = Contact.all
    render json: @contacts, status: :ok
  end

  def show
    vendors = @contact.vendors
    render json: @contact, serializer: ContactDetailSerializer, status: :ok
  end

  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      render json: @contact,
             status: :created,
             serializer: ContactDetailSerializer
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  def create_vendor_contact
    vendor_id = params[:vendor_id]
    contact_id = params[:contact_id]

    @vendor_contact =
      VendorContact.new(vendor_id: vendor_id, contact_id: contact_id)
    if @vendor_contact.save
      render json: @vendor_contact, status: :created
    else
      render json: @vendor_contact.errors, status: :unprocessable_entity
    end
  end

  def update
    if @contact.update(contact_params)
      render json: @contact, status: :ok, serializer: ContactDetailSerializer
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @contact.destroy
    head :no_content
  end

  private

  def set_contact
    @contact = Contact.find(params[:id])
  end

  def contact_params
    params.require(:contact).permit(
      :first_name,
      :last_name,
      :email,
      :phone,
      :title,
      :organization,
      :street_address,
      :city,
      :state,
      :zip_code,
      :primary,
    )
  end
end
