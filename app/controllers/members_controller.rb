class MembersController < ApplicationController
  def me
    @User = User.find(current_user.id)
    render json: @User, status: :ok, serializer: UserSerializer
  end
end
