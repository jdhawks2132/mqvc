# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, options = {})
    register_success && return if resource.persisted?

    register_failed
  end

  def register_success
    render json: {
             message: 'Signed up successfully',
             user: current_user,
           },
           status: :ok
  end

  def register_failed
    register json: {
               message: 'Something went wrong',
             },
             status: :unprocessable_entity
  end

  def sign_up_params
    params.require(:user).permit(:email, :password, :first_name, :last_name)
  end
end
