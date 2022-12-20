class Api::V1::UsersController < ApiController
  def index
    render json: User.all.order(:id), status: :ok if current_user.admin?
    unless current_user.admin?
      render json: User.where(id: current_user.id), status: :ok
    end
  end
end
