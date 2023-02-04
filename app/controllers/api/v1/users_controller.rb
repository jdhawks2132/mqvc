class Api::V1::UsersController < ApiController
  def index
    render json: User.all.order(:id), status: :ok if current_user.admin?
    unless current_user.admin?
      render json: User.where(id: current_user.id), status: :ok
    end
  end

  def admin_users_list
    if current_user.admin?
      admin_users = User.all.each { |user| user if user.admin? }
      render json: admin_users, status: :ok
    else
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end
end
