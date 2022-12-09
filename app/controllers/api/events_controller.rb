class Api::EventsController < ApplicationController
    # wrap_parameters include: Event.attribute_names
    before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        @events = Event.all
        if @events
            render :index
        else
            render json: ['no events found'], status:404
        end
    end

    def show
        @event = Event.find_by(id: params[:id])
        if @event 
            render :show
        else
            render json: ['event not found'], status:404
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
            render :show
        else
            render json: { errors: @event.errors.full_messages }, status: :unprocessable_entity
        end

    end

    def update

    end

    def destroy

    end

  
    private
  
    def event_params
      params.require(:event).permit(:title,:body, :address,
         :start_datetime, :end_datetime, :capacity,
        :ticket_price, :category)
    end
  end
  