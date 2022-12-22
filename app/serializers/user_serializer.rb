class UserSerializer < ActiveModel::Serializer
  attributes :id,
             :email,
             :first_name,
             :last_name,
             :admin_level,
             :has_vendor_attached

  def admin_level
    object.role.present? ? object.role.level : 0
  end

  def has_vendor_attached
    object.user_role.present? ? object.user_role.vendor : false
  end
end
