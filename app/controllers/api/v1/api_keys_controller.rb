class Api::V1::ApiKeysController < ApiController
  def show_api_key
    key = ApiKey.find_by(key_name: params[:key_name])
    if key && current_user.admin?
      render json: key, status: :ok
    else
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end

  def tiny_api
    key = ApiKey.find_by(key_name: 'TinyMCE')
    if key && current_user.admin?
      render json: key, status: :ok
    else
      render json: { error: 'Not authorized' }, status: :unauthorized
    end
  end
end
