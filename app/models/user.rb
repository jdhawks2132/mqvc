class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist

  has_many :vendor_assignments, dependent: :destroy
  has_many :vendors, through: :vendor_assignments
  has_one :user_role, dependent: :destroy
  has_one :role, through: :user_role


  def admin?
    role.level == 3
  end

  def read_only_admin?
    role.level == 2
  end

  def vendor?
    role.level == 1
  end

  def guest?
    role.level == 0
  end

  def attached_to_vendor(vendor_id)
    user_role.vendor_id.present? && user_role.vendor_id == vendor_id
  end
end
