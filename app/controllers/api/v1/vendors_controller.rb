class Api::V1::VendorsController < ApiController
  before_action :set_vendor, only: %i[show update destroy]
  before_action :set_user, only: %i[vendors_by_assignment, download_csv]

  def index
    current_user.admin? ?
      @vendors = Vendor.all :
      @vendors = current_user.vendors

    render json: @vendors, status: :ok
  end

  def export_vendors
    VendorExportJob.perform_async(current_user.id)

    render json: { message: 'Exporting vendors' }, status: :ok
  end

  def download_csv
    today = Date.today
    user_id = current_user.id
    file_path = "storage/downloads/vendor_export-#{today}-#{user_id}.csv"
    if File.exist?(file_path)
      send_file file_path,
                type: 'text/csv',
                disposition: 'attachment',
                status: :ok
    else
      render json: { message: 'File not found' }, status: :not_found
    end
  end

  def import_vendors
    if params[:file].present?
      file = params[:file]

      CsvImportVendorsService.new.call(file)

      render json: { message: 'Vendors imported' }, status: :ok
    else
      render json: { message: 'No file found' }, status: :not_found
    end
  end

  def vendors_by_assignment
    current_user.admin? || @user == current_user ?
      @vendors = @user.vendors :
      @vendors = nil

    if @vendors
      render json: @vendors, status: :ok
    else
      render json: {
               message: 'You are not authorized to view this page',
             },
             status: :unauthorized
    end
  end

  def show
    @vendor = Vendor.find(params[:id])
    render json: @vendor, serializer: VendorDetailSerializer, status: :ok
  end

  def create
    @vendor = Vendor.new(vendor_params)
    if @vendor.save
      render json: @vendor, status: :created
    else
      render json: @vendor.errors, status: :unprocessable_entity
    end
  end

  def update
    @vendor = Vendor.find(params[:id])
    if @vendor.update(vendor_params)
      render json: @vendor, status: :ok
    else
      render json: @vendor.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @vendor = Vendor.find(params[:id])
    @vendor.destroy
    head :no_content
  end

  private

  def vendor_params
    params.require(:vendor).permit(
      :name,
      :vendor_type,
      :status,
      :general_email,
      :website,
      :phone,
      :street_address,
      :city,
      :state,
      :zip,
      :country,
      :previous_participant,
      :notes,
    )
  end

  def set_vendor
    @vendor = Vendor.find(params[:id])
  end

  def set_user
    @user = User.find(params[:id])
  end
end
