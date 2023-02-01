class VendorAssignmentSerializer < ActiveModel::Serializer
  attributes :id, :vendor_id, :user_id, :vendor_name, :user_name

  def vendor_name
    object.vendor.name
  end

  def user_name
    object.user.first_name + ' ' + object.user.last_name
  end
end
