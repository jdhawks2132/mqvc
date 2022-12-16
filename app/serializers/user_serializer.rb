class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :admin_level

  def admin_level
    object.role.level
  end
end
