class Api::V1::VendorsController < ApiController
  def index
    @vendors = Vendor.all
    render json: @vendors, status: :ok
  end
end
