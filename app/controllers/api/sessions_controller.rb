class Api::SessionsController < ApplicationController
    # before_action :require_logged_out, only: [:create]
    # before_action :require_logged_in, only: [:destroy]
  
    def show
      
      if current_user
        @user = current_user
        # render template: 'api/users/show'
        render 'api/users/show'
      else
        render json: { user: nil }
      end
    end
  
    def create
      # debugger

      if !URI::MailTo::EMAIL_REGEXP.match?(params[:email])
        render json: { errors: ['Not a valid email address.'] }, status: :unauthorized
        return
      end

      @email = User.find_by(email: params[:email])
      if !@email 
        render json: { errors: ['There is no account associated with that email.'] }, status: :unauthorized
        return
      end

      @user = User.find_by_credentials(params[:email],params[:password])
      if @user
        login!(@user)
        # render template: 'api/users/show'
        render 'api/users/show'
      else
        render json: { errors: ['Password is not correct'] }, status: :unauthorized
      end
    end
  
    def destroy
  
      logout!
      # head :no_content
      render json: { message: 'successs' }
    end
  end
  
