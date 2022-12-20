# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, options = {})
    render json: {
             status: {
               code: 200,
               message: 'User signed in successfully',
               data: current_user,
             },
           },
           status: :ok
  end

  def respond_to_on_destroy
    log_out_success && return if current_user

    log_out_failure
  end

  def log_out_success
    render json: {
             status: {
               code: 200,
               message: 'User signed out successfully',
             },
           },
           status: :ok
  end

  def log_out_failure
    render json: {
             status: {
               code: 401,
               message: 'User not signed in',
             },
           },
           status: :unauthorized
  end
end
