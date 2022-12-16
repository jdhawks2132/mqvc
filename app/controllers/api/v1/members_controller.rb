class Api::V1::MembersController < ApiController
  def me
    render json: current_user, status: :ok
  end
end
