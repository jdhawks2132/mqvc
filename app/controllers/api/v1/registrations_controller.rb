class Api::V1::RegistrationsController < ApplicationController
  before_action :set_registration, only: %i[show update delete]

  def index
    render json: Registration.all, status: :ok
  end

  def show
    render json: @registration, status: :ok
  end

  def create
    registration = Registration.new(registration_params)
    if registration.save
      render json: registration, status: :created
    else
      render json: registration.errors, status: :unprocessable_entity
    end
  end

  def update
    if @registration.update(registration_params)
      render json: @registration, status: :ok
    else
      render json: @registration.errors, status: :unprocessable_entity
    end
  end

  def delete
    @registration.destroy
    head :no_content

    render json: { message: 'Registration Destroyed' }, status: :ok
  end

  private

  def set_registration
    @registration = Registration.find(params[:id])
  end

  def registration_params
    params.require(:registration).permit(
      :badges,
      :tables,
      :name,
      :registration_type,
      :registration_price,
    )
  end
end
