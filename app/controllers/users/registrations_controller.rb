# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    super do |resource|
      role = Role.find_by(id: 1)
      UserRole.create(user_id: resource.id, role_id: role.id)
    end
  end

  private

  def register_success
    render json: {
             message: 'Signed up successfully',
             user: current_user,
           },
           status: :ok
  end

  def register_failed
    render json: {
             message: 'Something went wrong',
             error: resource.errors.full_messages,
           },
           status: :unprocessable_entity
  end

  def sign_up_params
    params.require(:user).permit(:email, :password, :first_name, :last_name)
  end
end
