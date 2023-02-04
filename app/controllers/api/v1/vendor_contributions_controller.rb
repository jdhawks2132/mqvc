class Api::V1::VendorContributionsController < ApplicationController
  before_action :set_vendor_contribution, only: %i[show update delete]

  def index
    render json: VendorContribution.all, status: :ok
  end

  def show
    render json: @vendor_contribution, status: :ok
  end

  def create
    vendor_contribution = VendorContribution.new(vendor_contribution_params)
    if vendor_contribution.save
      render json: vendor_contribution, status: :created
    else
      render json: vendor_contribution.errors, status: :unprocessable_entity
    end
  end

  def update
    if @vendor_contribution.update(vendor_contribution_params)
      render json: @vendor_contribution, status: :ok
    else
      render json: @vendor_contribution.errors, status: :unprocessable_entity
    end
  end

  def delete
    @vendor_contribution.destroy
    head :no_content

    render json: { message: 'Vendor Contribution Destroyed' }, status: :ok
  end

  private

  def set_vendor_contribution
    @vendor_contribution = VendorContribution.find(params[:id])
  end

  def vendor_contribution_params
    params.require(:vendor_contribution).permit(
      :vendor_id,
      :contribution_id,
      :year,
      :notes,
      :status,
      :asset_link,
    )
  end
end
