class Api::V1::VendorAssignmentsController < ApiController
  before_action :set_vendor_assignment, only: %i[show update destroy]

  def index
    render json: VendorAssignment.all, status: :ok
  end

  def show
    render json: @vendor_assignment, status: :ok
  end

  def create
    vendor_assignment = VendorAssignment.create!(vendor_assignment_params)

    if vendor_assignment
      render json: vendor_assignment, status: :created
    else
      render json: vendor_assignment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @vendor_assignment.update!(vendor_assignment_params)
      render json: @vendor_assignment, status: :ok
    else
      render json: @vendor_assignment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @vendor_assignment.destroy
    head :no_content
  end

  private

  def vendor_assignment_params
    params.require(:vendor_assignment).permit(:vendor_id, :user_id)
  end

  def set_vendor_assignment
    @vendor_assignment = VendorAssignment.find(params[:id])
  end
end
