class Api::V1::UsersController < ApiController
  def index
    render json: User.all.order(:id), status: :ok if current_user.admin?
    unless current_user.admin?
      render json: User.where(id: current_user.id), status: :ok
    end
  end

  def admin_users_list
    if current_user.admin?
      # iterate through all users. Check to see if they have a role assigned, if so check to see if that user is user.admin? if so add them to the array
      admin_users = []
      User.all.each do |user|
        if user.role
          admin_users << user if user.admin? || user.read_only_admin?
        end
      end
      render json: admin_users, status: :ok
    else
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end
end
