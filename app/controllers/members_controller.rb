class MembersController < ApplicationController
  before_action :authenticate_user!, only: [:admin_users]
  def me
    @User = User.find(current_user.id)
    render json: @User, status: :ok, serializer: UserSerializer
  end

  def show
    user = get_user_from_token
    render json: user, status: :ok, serializer: UserSerializer
  end

  def admin_users
    @Users = User.all
    admin_users = @Users.select { |user| user.admin? || user.read_only_admin? }
    render json: admin_users, status: :ok, each_serializer: UserSerializer
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
