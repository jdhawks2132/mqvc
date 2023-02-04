class Api::V1::ContributionsController < ApplicationController
  before_action :set_contribution, only: %i[show update delete]

  def index
    render json: Contribution.all, status: :ok
  end

  def show
    render json: @contribution, status: :ok
  end

  def create
    contribution = Contribution.new(contribution_params)
    if contribution.save
      render json: contribution, status: :created
    else
      render json: contribution.errors, status: :unprocessable_entity
    end
  end

  def update
    if @contribution.update(contribution_params)
      render json: @contribution, status: :ok
    else
      render json: @contribution.errors, status: :unprocessable_entity
    end
  end

  def delete
    @contribution.destroy
    head :no_content

    render json: { message: 'Contribution Destroyed' }, status: :ok
  end

  private

  def set_contribution
    @contribution = Contribution.find(params[:id])
  end

  def contribution_params
    params.require(:contribution).permit(
      :contribution_type,
      :amount,
      :name,
      :dimensions,
    )
  end
end
