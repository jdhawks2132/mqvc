# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, options = {})
    if resource.persisted?
      render json: { status: { code: 200, message: 'Signed in successfully.', data: resource} }
    else 
      render json: { status: { code: 404, message: 'Use not found', errors: resource.errors.full_messages } }
    end
  end

  def respond_to_on_destroy
    jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last, Rails.application.credentials.fetch(:secret_key_base)).first
    current_user = User.find(jwt_payload['sub'])
    if current_user.present?
      render json: { status: { code: 200, message: 'User signed out successfully.' } }
    else
      render json: { status: { code: 500, message: 'User could not be deleted.' } }
    end
  end
end
