class Api::EventsController < ApplicationController
    # wrap_parameters include: Event.attribute_names
    before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        @current_user = current_user
        @events = Event.all
        if @events
            render :index
        else
            render json: {errors: ['no events found']}, status:404
        end
    end

    def show
        @event = Event.find_by(id: params[:id])
        if @event 
            render :show
        else
            render json: {errors: ['event not found']}, status:404
        end
    end
    
    def create
        # debugger
        @event = Event.new(event_params)
        @event.organizer_id = @current_user.id
        @event.start_datetime = @event.start_datetime ? @event.start_datetime.to_datetime : nil
        @event.end_datetime = @event.start_datetime ? @event.end_datetime.to_datetime : nil
        @event.ticket_price = @event.ticket_price.to_f
        @event.capacity = @event.capacity.to_i
        # debugger
        if @event.save
            # render :show
        else
            render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
        end

    end

    def update
        @event = Event.find_by(id: params[:id])
        debugger
        @event.start_datetime = @event.start_datetime ? @event.start_datetime.to_datetime : nil
        @event.end_datetime = @event.start_datetime ? @event.end_datetime.to_datetime : nil
        @event.ticket_price = @event.ticket_price.to_f
        @event.capacity = @event.capacity.to_i
        debugger

        if @event.update(event_params)
            render :show
        else
            render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
        end

    end

    def destroy
        @event = Event.find_by(id: params[:id])
        @events = Event.all

        if @event
            @event.destroy
            render :index
        else 
            render json: {errors: ['No event was found to delete']}, status:404
        end

    end

  
    private
  
    def event_params
      params.require(:event).permit(:title,:body, :address,
         :start_datetime, :end_datetime, :capacity,
        :ticket_price, :category, :photo)
    end
  end
  