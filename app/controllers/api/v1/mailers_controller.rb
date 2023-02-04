class Api::V1::MailersController < ApiController
  before_action :set_mailer, only: %i[show update destroy]

  def index
    render json: Mailer.all, status: :ok
  end

  def show
    render json: @mailer, status: :ok
  end

  def create
    @mailer = Mailer.new(mailer_params)
    if @mailer.save
      render json: @mailer, status: :created
    else
      render json: @mailer.errors, status: :unprocessable_entity
    end
  end

  def update
    if @mailer.update(mailer_params)
      render json: @mailer, status: :ok
    else
      render json: @mailer.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @mailer.destroy
    head :no_content

    render json: { message: 'Mailer deleted' }, status: :ok
  end

  private

  def set_mailer
    @mailer = Mailer.find(params[:id])
  end

  def mailer_params
    params.require(:mailer).permit(:subject, :body)
  end
end
