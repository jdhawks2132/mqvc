class MembersController < ApplicationController
  def me
    @User = User.find(current_user.id)
    render json: @User, status: :ok, serializer: UserSerializer
  end

  def show
    user = get_user_from_token
    render json: { message: 'You are logged in', user: user }
  end

  private

  def get_user_from_token
    jwt_payload =
      JWT.decode(
        request.headers['Authorization'].split(' ').last,
        Rails.application.credentials.devise[:jwt_secret_key],
      ).first
    user_id = jwt_payload['sub']
    user = User.find(user_id.to_s)
  end
end
