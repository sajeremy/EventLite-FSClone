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
      @user = User.find_by_credentials(params[:email],params[:password])
      
      if @user
        login!(@user)
        # render template: 'api/users/show'
        render 'api/users/show'
      else
        render json: { errors: ['The provided credentials were invalid.'] }, status: :unauthorized
      end
    end
  
    def destroy
  
      logout!
      # head :no_content
      render json: { message: 'successs' }
    end
  end
  
