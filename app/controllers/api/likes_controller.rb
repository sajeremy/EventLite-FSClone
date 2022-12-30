class Api::LikesController < ApplicationController
    before_action :require_logged_in

    def user_like_index
        @current_user = current_user
        @user_likes = Like.where(user_id: @current_user.id)
        @user_like_arr = []
        @user_likes.each do |like_obj|
            @user_like_arr.push(like_obj.event_id)
        end
        if @user_likes
            render :user_like_index
        else
            render json: {errors: ['no likes found']}, status:404
        end
    end

    def event_like_index
        @event_likes = Like.where(event_id: params[:event_id])
        if @event_likes
            render :event_like_index
        else
            render json: {errors: ['no likes found']}, status:404
        end
    end


    def create
        # debugger
        @like = Like.new(like_params)
        @like.user_id = current_user.id

        if @like.save
            
        else 
            render json: { errors: @like.errors.full_messages }, status: :unprocessable_entity
        end

    end

    def destroy
        # debugger
        @like = Like.find_by(event_id: params[:id], user_id: current_user.id)
        if @like
            @like.destroy
            render json: { message: 'Successfully unliked' }
        else 
            render json: {errors: ['Was not able to complete your request']}, status: :unprocessable_entity
        end

    end

    private
  
    def like_params
      params.require(:like).permit(:event_id)
    end

end
