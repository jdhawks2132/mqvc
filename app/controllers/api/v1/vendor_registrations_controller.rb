class Api::V1::VendorRegistrationsController < ApiController
  def index
    vendor_registrations =
      VendorRegistration.all.order(year: :desc, vendor_id: :asc)

    render json: vendor_registrations, status: :ok
  end

  def show
    render json: @vendor_registration, status: :ok
  end

  def create
    vendor_registration = VendorRegistration.new(vendor_registration_params)
    if vendor_registration.save
      render json: vendor_registration, status: :created
    else
      render json: vendor_registration.errors, status: :unprocessable_entity
    end
  end

  def update
    if @vendor_registration.update(vendor_registration_params)
      render json: @vendor_registration, status: :ok
    else
      render json: @vendor_registration.errors, status: :unprocessable_entity
    end
  end

  def delete
    @vendor_registration.destroy
    head :no_content

    render json: { message: 'Vendor Registration Destroyed' }, status: :ok
  end

  private

  def set_vendor_registration
    @vendor_registration = VendorRegistration.find(params[:id])
  end

  def vendor_registration_params
    params.require(:vendor_registration).permit(
      :vendor_id,
      :registration_id,
      :year,
      :notes,
      :status,
      :badge_names,
    )
  end
end
