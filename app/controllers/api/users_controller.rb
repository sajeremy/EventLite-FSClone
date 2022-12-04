class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password']
  # before_action :require_logged_out, only: [:create]
  
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      # render template: 'api/users/show'
      render :show
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name, :street_address, :city, :state, :country, :zipcode)
  end
end
